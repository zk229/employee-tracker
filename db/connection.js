const mysql = require("mysql2");
require("dotenv").config();

const db = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: process.env.SQL_PASSWORD,
        database: "company"
    },
    console.log("Connected to the company database!")
);

module.exports = db;