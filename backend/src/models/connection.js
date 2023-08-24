const mysql = require('mysql2/promise');

const config = {
    host: process.env.MYSQL_HOSTNAME || 'localhost',
    port: process.env.MYSQL_PORT || 3306,
    user: process.env.MYSQL_USER || 'root',
    password: process.env.MYSQL_PASSWORD || 'password',
    database: 'StoreManager',
    multipleStatements: true,
  };
  
  const connection = mysql.createPool(config);

  module.exports = connection;