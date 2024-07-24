var mysql = require('mysql2');
var connection = mysql.createConnection({
    host  : 'mysql',
    database:'ecommerce',
    user:'root',
    password:'password',
});


connection.connect((err) => {

  if (err) {

    console.error('Error connecting to MySQL: ', err);

    return;

  }

  console.log('Connected to MySQL database');

});

module.exports = connection; 