"use strict";

class UsersRepository {
  constructor(database) {
    this.database = database;
  }

  getUser(username, callback) {
    return this.database.query("SELECT * FROM userprofile WHERE username = ?", [username], callback);
  }

  addUser(username, password, callback) {
    const sql = `
      INSERT INTO userprofile
        (username, password, puzzle1, puzzle2, puzzle3, puzzle4, puzzle5, puzzle6, puzzle7, puzzle8, Hint)
      VALUES (?, ?, '0', '0', '0', '0', '0', '0', '0', '0', '00000000')
    `;
    return this.database.query(sql, [username, password], callback);
  }

  loginUser(username, password, callback) {
    return this.database.query(
      "SELECT username FROM userprofile WHERE username = ? AND password = ? LIMIT 1",
      [username, password],
      callback,
    );
  }

  getAllUsers(callback) {
    const sql = `
      SELECT username, puzzle1, puzzle2, puzzle3, puzzle4, puzzle5, puzzle6, puzzle7, puzzle8, Hint AS hint
      FROM userprofile
    `;
    return this.database.query(sql, callback);
  }

  postTime(username, puzzleColumn, callback) {
    return this.database.query(
      "UPDATE userprofile SET ?? = NOW() WHERE username = ?",
      [puzzleColumn, username],
      callback,
    );
  }

  useHint(username, hint, callback) {
    return this.database.query(
      "UPDATE userprofile SET Hint = ? WHERE username = ?",
      [hint, username],
      callback,
    );
  }

  puzzle7Login(username, password, callback) {
    return this.database.query(
      "SELECT username FROM puzzle7_user WHERE username = ? AND password = ? LIMIT 1",
      [username, password],
      callback,
    );
  }

  puzzle7Register(username, password, callback) {
    return this.database.query(
      "INSERT INTO puzzle7_user (username, password) VALUES (?, ?)",
      [username, password],
      callback,
    );
  }

  puzzle7Update(username, password, callback) {
    return this.database.query(
      "UPDATE puzzle7_user SET password = ? WHERE username = ?",
      [password, username],
      callback,
    );
  }

  puzzle7GetUser(username, callback) {
    return this.database.query(
      "SELECT user_id, username FROM puzzle7_user WHERE username = ?",
      [username],
      callback,
    );
  }
}

module.exports = { UsersRepository };
