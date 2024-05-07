"use strict";

const { test, beforeEach } = require("node:test");
const assert = require("node:assert/strict");
const request = require("supertest");
const jwt = require("jsonwebtoken");
const { createApp } = require("../src/app");

const config = {
  bodyLimit: "32kb",
  corsOrigins: "*",
  jwtSecret: "test-secret",
  jwtExpiresIn: "1h",
  eventStartAt: "2026-07-15T09:00:00+08:00",
  eventTimezoneOffset: "+08:00",
  serveFrontend: false,
};

class FakeDatabase {
  constructor() {
    this.handlers = [];
  }

  respond(result, error = null) {
    this.handlers.push({ result, error });
  }

  query(sql, values, callback) {
    if (typeof values === "function") callback = values;
    const response = this.handlers.shift() || { result: [] };
    queueMicrotask(() => callback(response.error, response.result));
  }

  async check() {}
}

let database;
let app;

beforeEach(() => {
  database = new FakeDatabase();
  app = createApp({ database, config });
});

test("health endpoints report service availability", async () => {
  const health = await request(app).get("/health").expect(200);
  const ready = await request(app).get("/ready").expect(200);
  assert.equal(health.body.status, "ok");
  assert.equal(ready.body.status, "ready");
});

test("event settings expose the authoritative start time", async () => {
  const response = await request(app).get("/event").expect(200);
  assert.equal(response.body.startAt, config.eventStartAt);
  assert.equal(response.body.timezoneOffset, "+08:00");
});

test("login issues a verifiable expiring token", async () => {
  database.respond([{ username: "team-one" }]);
  const response = await request(app)
    .post("/LoginTPusers")
    .send({ Username: "team-one", Password: "hash" })
    .expect(200);

  const payload = jwt.verify(response.body.result, config.jwtSecret);
  assert.equal(payload.username, "team-one");
  assert.ok(payload.exp > payload.iat);
});

test("login rejects incorrect credentials", async () => {
  database.respond([]);
  const response = await request(app)
    .post("/LoginTPusers")
    .send({ Username: "team-one", Password: "wrong" })
    .expect(401);
  assert.equal(response.body, 0);
});

test("timing updates only accept known puzzle columns", async () => {
  const token = jwt.sign({ username: "team-one" }, config.jwtSecret);
  const response = await request(app)
    .post("/addTime")
    .send({ token, puzzleNum: "password", puzzleTime: "12:00" })
    .expect(400);
  assert.equal(response.body.error.code, "VALIDATION_ERROR");
});

test("timing updates do not require a browser supplied timestamp", async () => {
  const token = jwt.sign({ username: "team-one" }, config.jwtSecret);
  database.respond({ affectedRows: 1 });
  await request(app)
    .post("/addTime")
    .send({ token, puzzleNum: "puzzle3" })
    .expect(200);
});

test("hint updates require an eight-bit hint mask", async () => {
  const token = jwt.sign({ username: "team-one" }, config.jwtSecret);
  const response = await request(app)
    .post("/useHint")
    .send({ token, Hint: "101" })
    .expect(400);
  assert.equal(response.body.error.code, "VALIDATION_ERROR");
});

test("the challenge profile swap still accepts the intercepted username", async () => {
  database.respond({ affectedRows: 1 });
  await request(app)
    .post("/SwappingPuzzle7")
    .send({ Username: "admin", Password: "asd1" })
    .expect(200);
});

test("unknown routes return a consistent error envelope", async () => {
  const response = await request(app).get("/missing").expect(404);
  assert.equal(response.body.error.code, "NOT_FOUND");
  assert.ok(response.body.error.requestId);
});
