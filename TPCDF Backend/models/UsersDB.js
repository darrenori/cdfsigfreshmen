"user strict";

var db = require('../tpcdfsig');

class UsersDB {

    getUser(username, callback){
        var sql = "SELECT * FROM test.userprofile WHERE username = ?;";
        return db.query(sql, [username], callback);
    }

    addUser(user, callback){
        var sql = "INSERT INTO `test`.`userprofile` (`username`, `password`, `puzzle1`, `puzzle2`, `puzzle3`, `puzzle4`, `puzzle5`, `puzzle6`, `puzzle7`, `puzzle8`, `Hint`) VALUES (?, ?, '0', '0', '0', '0', '0', '0', '0', '0', '00000000');";
        db.query(sql, [user.getusername(), user.getpassword()], callback);
    }

    loginUser(user, callback){
        var sql = "SELECT * FROM test.userprofile WHERE username = ? AND password = ?;";
        db.query(sql, [user.getusername(), user.getpassword()], callback);
    }

    loginUser2(username, password, callback){
        var sql = "SELECT * FROM test.puzzle7_user WHERE username = ? AND password = ?;";
        db.query(sql, [username, password], callback); 
    } 

    getAllUsers(callback){
        var sql = "SELECT username, puzzle1, puzzle2, puzzle3, puzzle4, puzzle5, puzzle6, puzzle7, puzzle8, hint FROM test.userprofile;";
        return db.query(sql, callback)
    }

    //Requires to uncheck safe update under mysql (edit > preferences > sql editor > uncheck safe updates)
    postTime(username,puzzleNum,puzzleTime, callback){
        var sql = "UPDATE test.userprofile SET ?? = ? WHERE username = ?";
        return db.query(sql,[puzzleNum,puzzleTime,username], callback);
        
    }

    useHint(username,Hint,callback){
        var sql = "UPDATE test.userprofile SET Hint=? WHERE username=?;";
        return db.query(sql,[Hint,username], callback);
    }

    
    puzzle7_login(username,password, callback){
        var sql = "SELECT * FROM test.puzzle7_user WHERE username = ? AND password = ?;";
        db.query(sql, [username, password], callback);
    }

    puzzle7_register(username, password, callback){
        var sql = "INSERT INTO test.puzzle7_user (`username`, `password`) VALUES(?,?)";
        db.query(sql,[username, password], callback);
    }

    puzzle7_update(username,password, callback){
        var sql = "UPDATE test.puzzle7_user SET password = ? WHERE username = ?";
        db.query(sql,[password,username], callback);
    }
    puzzle7_getUser(username, callback){
        var sql = "SELECT * FROM test.puzzle7_user WHERE username = ?;";
        return db.query(sql, [username], callback);
    }
    

}

module.exports = UsersDB;