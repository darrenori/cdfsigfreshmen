"use strict";

const { test } = require("node:test");
const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");
const vm = require("node:vm");

const source = fs.readFileSync(
  path.resolve(__dirname, "../../CTF-Frontend/js/hackerboard.js"),
  "utf8",
);

function loadLeaderboard() {
  const window = {};
  vm.runInNewContext(source, { window });
  return window.CtfLeaderboard;
}

test("duration formatting handles seconds, minutes, and hours", () => {
  const leaderboard = loadLeaderboard();
  assert.equal(leaderboard.formatDuration(8), "8 seconds");
  assert.equal(leaderboard.formatDuration(125), "2min 5sec");
  assert.equal(leaderboard.formatDuration(3725), "1hr 2min 5sec");
});

test("SQL timestamps are interpreted in the event timezone", () => {
  const leaderboard = loadLeaderboard();
  const timestamp = leaderboard.parseSolveTime("2026-07-15 09:03:00", "+08:00");
  assert.equal(new Date(timestamp).toISOString(), "2026-07-15T01:03:00.000Z");
});

test("standings rank by score and deduct used hints", () => {
  const leaderboard = loadLeaderboard();
  const event = { startAt: "2026-07-15T09:00:00+08:00", timezoneOffset: "+08:00" };
  const users = [
    {
      username: "slower",
      puzzle1: "2026-07-15 09:02:00",
      puzzle2: "2026-07-15 09:04:00",
      puzzle3: "2026-07-15 09:06:00",
      hint: "00100000",
    },
    {
      username: "faster",
      puzzle1: "2026-07-15 09:01:00",
      puzzle2: "2026-07-15 09:02:00",
      hint: "00000000",
    },
  ];

  const standings = leaderboard.rankUsers(users, event);
  assert.equal(standings[0].username, "slower");
  assert.equal(standings[0].score, 50);
  assert.equal(standings[0].elapsedSeconds, 360);
  assert.equal(standings[1].score, 30);
});
