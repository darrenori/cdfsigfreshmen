"use strict";

const mysql = require("mysql2");
const { config } = require("./config");

function createDatabase(options) {
  const pool = mysql.createPool({
    ...options,
    waitForConnections: true,
    queueLimit: 0,
    enableKeepAlive: true,
    keepAliveInitialDelay: 0,
    charset: "utf8mb4",
  });

  return {
    query(sql, values, callback) {
      if (typeof values === "function") return pool.query(sql, values);
      return pool.query(sql, values, callback);
    },
    async check() {
      await pool.promise().query("SELECT 1");
    },
    async close() {
      await pool.promise().end();
    },
  };
}

const database = createDatabase(config.database);

module.exports = { createDatabase, database };
