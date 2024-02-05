"use strict";

const crypto = require("node:crypto");
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const { UsersRepository } = require("./users-repository");
const { createUserController } = require("./user-controller");
const { HttpError } = require("./http-error");
const { logger } = require("./logger");

function corsOptions(allowedOrigins) {
  if (allowedOrigins === "*") return { origin: true };
  return {
    origin(origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) return callback(null, true);
      return callback(new HttpError(403, "Origin is not allowed", "CORS_DENIED"));
    },
  };
}

function createApp({ database, config }) {
  const app = express();
  const repository = new UsersRepository(database);
  const controller = createUserController({
    repository,
    jwtSecret: config.jwtSecret,
    jwtExpiresIn: config.jwtExpiresIn,
  });

  app.disable("x-powered-by");
  app.use(helmet({ contentSecurityPolicy: false }));
  app.use(cors(corsOptions(config.corsOrigins)));
  app.use(express.json({ limit: config.bodyLimit }));
  app.use(express.urlencoded({ extended: false, limit: config.bodyLimit }));
  app.use((req, res, next) => {
    req.id = req.get("x-request-id") || crypto.randomUUID();
    res.set("x-request-id", req.id);
    const startedAt = Date.now();
    res.on("finish", () => {
      logger.info("http.request", {
        requestId: req.id,
        method: req.method,
        path: req.path,
        status: res.statusCode,
        durationMs: Date.now() - startedAt,
      });
    });
    next();
  });

  app.get("/health", (req, res) => {
    res.json({ status: "ok", uptimeSeconds: Math.floor(process.uptime()) });
  });

  app.get("/ready", async (req, res) => {
    try {
      await database.check();
      res.json({ status: "ready" });
    } catch {
      res.status(503).json({ status: "unavailable" });
    }
  });

  app.get("/event", (req, res) => {
    res.json({
      startAt: config.eventStartAt,
      timezoneOffset: config.eventTimezoneOffset,
    });
  });

  app.get("/TPuser/:Username", controller.getUser);
  app.post("/TPusers", controller.addUser);
  app.post("/LoginTPusers", controller.loginUser);
  app.post("/Getuser/:token", controller.userInfo);
  app.get("/GetAllUsers", controller.getAllUsers);
  app.post("/addTime", controller.postTiming);
  app.post("/useHint", controller.useHint);
  app.get("/Puzzle7/:Username", controller.puzzle7GetUser);
  app.post("/LoggingPuzzle7", controller.puzzle7Login);
  app.post("/SwappingPuzzle7", controller.puzzle7Update);
  app.post("/RegisteringPuzzle7", controller.puzzle7Register);
  app.post("/puzzle7_checkusername", controller.puzzle7CheckUser);
  app.get("/puzzle7_checkusername/:decoded_Username", controller.puzzle7CheckUser);

  if (config.serveFrontend) {
    app.use(express.static(config.frontendDirectory, { extensions: ["html"] }));
  }

  app.use((req, res, next) => {
    next(new HttpError(404, "Route not found", "NOT_FOUND"));
  });

  app.use((error, req, res, next) => {
    const status = Number.isInteger(error.status) ? error.status : 500;
    if (status >= 500) {
      logger.error("http.error", { requestId: req.id, error });
    }
    if (res.headersSent) return next(error);
    return res.status(status).json({
      error: {
        code: error.code || "INTERNAL_ERROR",
        message: status >= 500 ? "Internal server error" : error.message,
        requestId: req.id,
      },
    });
  });

  return app;
}

module.exports = { corsOptions, createApp };
