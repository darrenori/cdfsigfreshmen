"use strict";

const jwt = require("jsonwebtoken");
const { HttpError } = require("./http-error");

const USERNAME_MAX = 45;
const PASSWORD_MAX = 128;
const PUZZLE_COLUMNS = new Set(Array.from({ length: 8 }, (_, index) => `puzzle${index + 1}`));

function requiredString(value, field, maxLength) {
  if (typeof value !== "string" || value.trim() === "") {
    throw new HttpError(400, `${field} is required`, "VALIDATION_ERROR");
  }
  if (value.length > maxLength) {
    throw new HttpError(400, `${field} is too long`, "VALIDATION_ERROR");
  }
  return value;
}

function createUserController({ repository, jwtSecret, jwtExpiresIn }) {
  function tokenFor(username) {
    return jwt.sign({ username }, jwtSecret, { expiresIn: jwtExpiresIn });
  }

  function usernameFromToken(token) {
    try {
      const payload = jwt.verify(token, jwtSecret);
      if (typeof payload === "string") return payload;
      return payload.username || false;
    } catch {
      return false;
    }
  }

  function callbackResponse(res, next, options = {}) {
    return (error, result) => {
      if (error) return next(error);
      if (options.notFound && (!result || result.length === 0)) {
        return next(new HttpError(404, options.notFound, "NOT_FOUND"));
      }
      return res.status(options.status || 200).json(result);
    };
  }

  return {
    getUser(req, res, next) {
      const username = requiredString(req.params.Username, "Username", USERNAME_MAX);
      repository.getUser(username, callbackResponse(res, next));
    },

    addUser(req, res, next) {
      const username = requiredString(req.body.Username, "Username", USERNAME_MAX);
      const password = requiredString(req.body.Password, "Password", PASSWORD_MAX);
      repository.addUser(username, password, callbackResponse(res, next, { status: 201 }));
    },

    loginUser(req, res, next) {
      const username = requiredString(req.body.Username, "Username", USERNAME_MAX);
      const password = requiredString(req.body.Password, "Password", PASSWORD_MAX);
      repository.loginUser(username, password, (error, result) => {
        if (error) return next(error);
        if (!result || result.length !== 1) return res.status(401).json(0);
        return res.json({ result: tokenFor(username) });
      });
    },

    userInfo(req, res) {
      const username = usernameFromToken(req.params.token);
      return res.json({ result: username || "invalid token" });
    },

    getAllUsers(req, res, next) {
      repository.getAllUsers(callbackResponse(res, next));
    },

    postTiming(req, res, next) {
      const username = usernameFromToken(req.body.token);
      if (!username) return next(new HttpError(401, "Invalid or expired token", "INVALID_TOKEN"));
      if (!PUZZLE_COLUMNS.has(req.body.puzzleNum)) {
        return next(new HttpError(400, "puzzleNum must be puzzle1 through puzzle8", "VALIDATION_ERROR"));
      }
      repository.postTime(username, req.body.puzzleNum, callbackResponse(res, next));
    },

    useHint(req, res, next) {
      const username = usernameFromToken(req.body.token);
      if (!username) return next(new HttpError(401, "Invalid or expired token", "INVALID_TOKEN"));
      const hint = requiredString(req.body.Hint, "Hint", 8);
      if (!/^[01]{8}$/.test(hint)) {
        return next(new HttpError(400, "Hint must contain eight binary digits", "VALIDATION_ERROR"));
      }
      repository.useHint(username, hint, callbackResponse(res, next));
    },

    puzzle7Login(req, res, next) {
      const username = requiredString(req.body.Username, "Username", USERNAME_MAX);
      const password = requiredString(req.body.Password, "Password", PASSWORD_MAX);
      repository.puzzle7Login(username, password, (error, result) => {
        if (error) return next(error);
        if (!result || result.length === 0) return res.status(401).json(0);
        return res.json({ result: tokenFor(username), Username: username });
      });
    },

    puzzle7Register(req, res, next) {
      const username = requiredString(req.body.Username, "Username", USERNAME_MAX);
      const password = requiredString(req.body.Password, "Password", PASSWORD_MAX);
      repository.puzzle7Register(username, password, callbackResponse(res, next, { status: 201 }));
    },

    puzzle7Update(req, res, next) {
      const tokenOrUsername = requiredString(req.body.Username, "Username", 2048);
      const password = requiredString(req.body.Password, "Password", PASSWORD_MAX);
      const signedUsername = usernameFromToken(tokenOrUsername.slice(0, -1));
      const username = signedUsername || tokenOrUsername;
      repository.puzzle7Update(username, password, callbackResponse(res, next));
    },

    puzzle7GetUser(req, res, next) {
      const username = requiredString(req.params.Username, "Username", USERNAME_MAX);
      repository.puzzle7GetUser(username, callbackResponse(res, next));
    },

    puzzle7CheckUser(req, res) {
      const token = req.params.decoded_Username || req.body.token;
      return res.json({ result: usernameFromToken(token) || false });
    },
  };
}

module.exports = { createUserController, requiredString };
