const mysql = require("mysql2");
const inquirer = require("inquirer");
const questions = require("./lib/questions");
const queries = require("./lib/queries");
const cTable = require("console.table");
const db = require("./db/connection.js");

db.query(queries.addDept, ["Janitorial"], (err, rows) => {
    console.table(rows);
});