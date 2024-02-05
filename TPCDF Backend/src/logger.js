"use strict";

function serializeError(error) {
  if (!(error instanceof Error)) return error;
  return {
    name: error.name,
    message: error.message,
    stack: process.env.NODE_ENV === "production" ? undefined : error.stack,
    code: error.code,
  };
}

function write(level, event, details = {}) {
  const payload = { timestamp: new Date().toISOString(), level, event };
  for (const [key, value] of Object.entries(details)) {
    payload[key] = key === "error" ? serializeError(value) : value;
  }
  const output = JSON.stringify(payload);
  if (level === "error") console.error(output);
  else console.log(output);
}

const logger = {
  info: (event, details) => write("info", event, details),
  error: (event, details) => write("error", event, details),
};

module.exports = { logger };
