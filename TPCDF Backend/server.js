"use strict";

const { createApp } = require("./src/app");
const { config } = require("./src/config");
const { database } = require("./src/database");
const { logger } = require("./src/logger");

let server;
let shuttingDown = false;

async function start() {
  await database.check();

  const app = createApp({ database, config });
  server = app.listen(config.port, config.host, () => {
    logger.info("server.started", {
      host: config.host,
      port: config.port,
      environment: config.environment,
    });
  });
}

async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info("server.stopping", { signal });

  const forceExit = setTimeout(() => {
    logger.error("server.shutdown_timeout");
    process.exit(1);
  }, config.shutdownTimeoutMs);
  forceExit.unref();

  if (server) {
    await new Promise((resolve, reject) => {
      server.close((error) => (error ? reject(error) : resolve()));
    });
  }

  await database.close();
  clearTimeout(forceExit);
  logger.info("server.stopped");
}

process.on("SIGINT", () => shutdown("SIGINT").then(() => process.exit(0)));
process.on("SIGTERM", () => shutdown("SIGTERM").then(() => process.exit(0)));

process.on("unhandledRejection", (error) => {
  logger.error("process.unhandled_rejection", { error });
});

start().catch((error) => {
  logger.error("server.start_failed", { error });
  process.exit(1);
});
