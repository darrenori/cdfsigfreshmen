"use strict";

const path = require("node:path");
const dotenv = require("dotenv");

dotenv.config();

function integer(name, fallback, minimum = 0) {
  const raw = process.env[name];
  if (raw === undefined || raw === "") return fallback;
  const value = Number(raw);
  if (!Number.isInteger(value) || value < minimum) {
    throw new Error(`${name} must be an integer greater than or equal to ${minimum}`);
  }
  return value;
}

function boolean(name, fallback) {
  const raw = process.env[name];
  if (raw === undefined || raw === "") return fallback;
  if (raw === "true") return true;
  if (raw === "false") return false;
  throw new Error(`${name} must be true or false`);
}

function origins(raw) {
  if (!raw || raw === "*") return "*";
  return raw.split(",").map((origin) => origin.trim()).filter(Boolean);
}

function timestamp(name, fallback) {
  const raw = process.env[name] || fallback;
  if (Number.isNaN(Date.parse(raw))) {
    throw new Error(`${name} must be an ISO 8601 timestamp`);
  }
  return raw;
}

const environment = process.env.NODE_ENV || "development";
const frontendDirectory = path.resolve(__dirname, "../../CTF-Frontend");

const config = Object.freeze({
  environment,
  host: process.env.HOST || "127.0.0.1",
  port: integer("PORT", 8081, 1),
  bodyLimit: process.env.BODY_LIMIT || "32kb",
  corsOrigins: origins(process.env.CORS_ORIGINS),
  jwtSecret: process.env.JWT_SECRET || "hehexd",
  jwtExpiresIn: process.env.JWT_EXPIRES_IN || "12h",
  eventStartAt: timestamp("EVENT_START_AT", "2021-10-29T07:00:00+08:00"),
  eventTimezoneOffset: process.env.EVENT_TIMEZONE_OFFSET || "+08:00",
  serveFrontend: boolean("SERVE_FRONTEND", true),
  frontendDirectory,
  shutdownTimeoutMs: integer("SHUTDOWN_TIMEOUT_MS", 10000, 1000),
  database: Object.freeze({
    host: process.env.DB_HOST || "127.0.0.1",
    port: integer("DB_PORT", 3307, 1),
    user: process.env.DB_USER || "root",
    password: process.env.DB_PASSWORD || "",
    database: process.env.DB_NAME || "test",
    connectionLimit: integer("DB_CONNECTION_LIMIT", 10, 1),
  }),
});

module.exports = { config, boolean, integer, origins, timestamp };
