const mysql = require('mysql2');
const connection = mysql.createConnection({
host: 'localhost',
user: 'root',
  password: '00000000',
  database: 'stock_manager',
});
module.exports=connection;