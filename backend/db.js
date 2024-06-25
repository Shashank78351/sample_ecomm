var mysql = require('mysql2');
var connection = mysql.createConnection({
    host  : '127.0.0.1',
    database:'project_db',
    user:'root',
    password:'Ks@#1911',
});


connection.connect((err) => {

  if (err) {

    console.error('Error connecting to MySQL: ', err);

    return;

  }

  console.log('Connected to MySQL database');

});

module.exports = connection; 