/**
 * @desc This file will contain the connection to the MySQL database
 */

const mysql = require('mysql2/promise');

// import the environment variables
require('dotenv').config();

// create the connection to the database
const connection = mysql.createPool({
  host: process.env.MYSQL_HOST,
  user: process.env.MYSQL_USER,
  password: process.env.MYSQL_PASSWORD,
  database: process.env.MYSQL_DATABASE
});

module.exports = connection;