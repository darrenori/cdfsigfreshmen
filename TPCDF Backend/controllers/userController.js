"use strict";
const User = require('../Getters_Setters/User');
const UsersDB = require('../models/UsersDB');
var jwt = require('jsonwebtoken')
var secret = "hehexd"

var usersDB = new UsersDB();

function getUser(request, respond){
    var username = request.params.Username;
    usersDB.getUser(username, function(error,result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result)
        }
    }); 
}

function loginUser(request,respond){
    var user = new User(null, request.body.Username, request.body.Password);
    var username = request.body.Username;

    usersDB.loginUser(user, function(error, result){
        if(result.length == 1){
            var token = jwt.sign(username,secret)
            respond.json({result:token});
        }else{
            respond.json(0);
        }   
    })
}

function addUser(request, respond){
    var user = new User(null, request.body.Username, request.body.Password);
    usersDB.addUser(user, function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    })
}

function userInfo(request, respond){
    var token = request.params.token;
    try{
        var decoded = jwt.verify(token, secret);
        respond.json({result:decoded});
    } catch(err){
        respond.json({result: "invalid token"})
    }
}

function getAllUsers(request, respond){
    usersDB.getAllUsers(function(error, result){
        if(error){
            respond.json(error);
        }
        else{
            respond.json(result);
        }
    });
}

function postTiming(request, respond)
{
    var token = request.body.token;
    var decoded = checking(token)
    if(decoded != false)
    {
        usersDB.postTime(decoded,request.body.puzzleNum,request.body.puzzleTime, function(error, result)
        {
            respond.json(result);
        });
    }

    else{
        respond.json(error);
    }
}

function checking(token){
    try 
    {
    var decoded = jwt.verify(token,secret);
      return decoded;
    }
    catch (error) 
    {
       return false;
    } 
}

function useHint(request, respond)
{
    var token = request.body.token;
    var decoded = checking(token)
    if(decoded != false)
    {
        usersDB.useHint(decoded,request.body.Hint, function(error, result)
        {
            respond.json(result);
        });
    }

    else{
        respond.json(error);
    }
}


function puzzle7_login(request, respond) {
    var username = request.body.Username;
    var password = request.body.Password;
    console.log(username);
    console.log(password);
    usersDB.puzzle7_login(username, password, function (error, result) {
        if (result.length != 0) {
            var token = jwt.sign(username, secret)
            respond.json({ result: token, Username: username });
            // respond.json({Username:username});
            console.log("i am username", username);
        } else {
            console.log("okay")
            respond.json(0);
        }
    })
}

// function loginUser2(request,respond){
//     var username = request.body.Username;
//     var password = request.body.Password;

//     usersDB.loginUser2(username,password, function(error, result){
//         if(result.length !=0){
//             var token = jwt.sign(username,secret)
//             respond.json({result:token, Username:username});
//             // respond.json({Username:username});
//             console.log("i am username",username);
//         }else{
//             console.log("okay")
//             respond.json(0);
//         }    })
// }


function puzzle7_register(request, respond) {
    var username = request.body.Username;
    var password = request.body.Password;
    usersDB.puzzle7_register(username, password, function (error, result) {
        if (error) {
            console.log("ERROR at registration");
            respond.json(error);
        } else {
            console.log("SUCCESS at registration");
            respond.json(result);
        }
    })
}

function puzzle7_update(request, respond) {
    var token = request.body.Username;
    //token will be token in SS +1, or Burp Suite username

    var password = request.body.Password;
    //slice the token to get the real token from SS
    if (typeof token == "string") {
        var decoded = checking(token.slice(0, -1))
        //checking() function returns the username or false 
        if (decoded != false) {
            //this code will only run if username from SS has been verified to exist
            //this code will not run if Burp Suite username
            usersDB.puzzle7_update(decoded, password, function (error, result) {
                if (error) {
                    respond.json(error);
                } else {
                    respond.json(result);
                }
            })
        } else if (token != false) {
            //this code will run if Burpsuite username is not "false"
            usersDB.puzzle7_update(token, password, function (error, result) {
                if (error) {
                    respond.json(error);
                } else {
                    respond.json(result);
                }
            })
        }
    }
    else {
        //this code will run if username does not exist or 
        console.log("Username is not a string.")
    }
}
function puzzle7_getUser(request, respond) {
    var username = request.params.Username;
    usersDB.puzzle7_getUser(username, function (error, result) {
        if (error) {
            respond.json(error);
        }
        else {
            respond.json(result)
        }
    });
}

function puzzle7_checkuser(request, respond) {
    var token = request.params.decoded_Username;
    var decoded = checking(token)
    usersDB.puzzle7_getUser(decoded, function (error, result) {
        if (error) {
            console.log(error);
            respond.json(error);
        }
        else {
            console.log({ result: decoded })
            respond.json({ result: decoded })
        }
    });
}

module.exports = {getUser, loginUser, addUser, userInfo, getAllUsers, postTiming, useHint, puzzle7_login, puzzle7_update, puzzle7_register, puzzle7_getUser, puzzle7_checkuser }