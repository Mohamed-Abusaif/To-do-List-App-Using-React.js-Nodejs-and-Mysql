const mysql = require("mysql2");
require('dotenv').config()


const pool = mysql.createPool({
    connectionLimit : 100, //important
    host     : process.env.HOST,
    user     : 'root',
    password: process.env.PASSWORD,
    port: process.env.DBPORT,
    database : 'todoapp',
});


module.exports = pool;