const mysql = require("mysql2");
const inquirer = require("inquirer");
const cTable = require("console.table");
const db = require("./db/connection.js");

db.query("SELECT * FROM employee", (err, rows) => {
    console.table(rows);
})