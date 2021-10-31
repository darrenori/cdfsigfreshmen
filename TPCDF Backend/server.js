"use strict";

//The express framework is built on top of the node. js framework and helps in fast-tracking development of server-based applications
const express = require("express"); 
const bodyParser = require("body-parser"); 
const userController = require('./controllers/userController');

var cors = require('cors');

const { stringify } = require('querystring');
var app = express();
var host = "127.0.0.1";
var port = 8081;

app.use(cors());
//This app starts a server and listens on port 8080 for connection
var server = app.listen(port, host, function() {
    var host = server.address().address;
    var port = server.address().port;

    console.log("Example Apps listen at http://%s:%s", host, port);
});

//To get inputs sent in the body of the request, we need to use the body-parse
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.route('/TPuser/:Username').get(userController.getUser);
app.route('/TPusers').post(userController.addUser);
app.route('/LoginTPusers').post(userController.loginUser);
app.route('/Getuser/:token').post(userController.userInfo);
app.route('/GetAllUsers').get(userController.getAllUsers);
app.route('/addTime').post(userController.postTiming);
app.route('/useHint').post(userController.useHint); 
app.route('/Puzzle7/:Username').get(userController.puzzle7_getUser);
app.route('/LoggingPuzzle7').post(userController.puzzle7_login);
app.route('/SwappingPuzzle7').post(userController.puzzle7_update); 
app.route('/RegisteringPuzzle7').post(userController.puzzle7_register);
app.route('/puzzle7_checkusername').post(userController.puzzle7_checkuser);
app.route('/puzzle7_checkusername/:decoded_Username').get(userController.puzzle7_checkuser);  