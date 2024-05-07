"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(
  path.resolve(__dirname, "../../CTF-Frontend/js/api.js"),
  "utf8",
);

function loadClient({ location, fetch, configuredUrl }) {
  const window = {
    AbortController,
    CDFSIG_API_URL: configuredUrl,
    clearTimeout,
    document: { querySelector: () => null },
    fetch,
    location,
    setTimeout,
  };
  vm.runInNewContext(source, { window });
  return window.CtfApi;
}

function jsonResponse(status, body) {
  return {
    ok: status >= 200 && status < 300,
    status,
    headers: { get: () => "application/json" },
    json: async () => body,
    text: async () => JSON.stringify(body),
  };
}

test("the browser client uses the current host for split development servers", () => {
  const api = loadClient({
    location: { protocol: "http:", hostname: "192.168.1.20", port: "5500", origin: "http://192.168.1.20:5500" },
    fetch: async () => jsonResponse(200, {}),
  });
  assert.equal(api.baseUrl, "http://192.168.1.20:8081");
});

test("the browser client stays on the same origin when served by the backend", () => {
  const api = loadClient({
    location: { protocol: "http:", hostname: "event.local", port: "8081", origin: "http://event.local:8081" },
    fetch: async () => jsonResponse(200, {}),
  });
  assert.equal(api.url("/health"), "http://event.local:8081/health");
});

test("the browser client returns JSON responses", async () => {
  const api = loadClient({
    location: { protocol: "http:", hostname: "localhost", port: "8081", origin: "http://localhost:8081" },
    fetch: async () => jsonResponse(200, { status: "ok" }),
  });
  assert.deepEqual(await api.get("/health"), { status: "ok" });
});

test("the browser client exposes server error messages", async () => {
  const api = loadClient({
    location: { protocol: "http:", hostname: "localhost", port: "8081", origin: "http://localhost:8081" },
    fetch: async () => jsonResponse(400, { error: { message: "Username is required" } }),
  });
  await assert.rejects(api.post("/TPusers", {}), /Username is required/);
});
