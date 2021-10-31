var mysql = require('mysql');

var connection = mysql.createConnection({
    host:'localhost',
    port: '3307',
    user:'root',
    password:'',
    database: 'test'
});

//check connection if it is successful
connection.connect((err) => {
    if (err) throw err;
    console.log('Connected to MySQL Server!');
  });
  
module.exports = connection;