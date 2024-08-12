const maxRetries = 5;
let retryCount = 0;

var mysql = require('mysql2');
var connection = mysql.createConnection({
    host  : 'mysql-service',
    database:'ecommerce',
    user:'myuser',
    password:'admin#123',
});


connection.connect((err) => {

if (err) {
            console.error('Error connecting to MySQL:', err);
            if (retryCount < maxRetries && err.code === 'EAI_AGAIN') {
                retryCount++;
                console.log(`Retrying connection (${retryCount}/${maxRetries})...`);
                setTimeout(connectToDatabase, 2000);  // Retry after 2 seconds
            } else {
                console.error('Max retries reached. Could not connect to MySQL.');
            }
            return;
        }

  console.log('Connected to MySQL database');

});

module.exports = connection; 
