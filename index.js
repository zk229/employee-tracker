const mysql = require("mysql2");
const inquirer = require("inquirer");
const questions = require("./lib/questions");
const queries = require("./lib/queries");
const cTable = require("console.table");
const db = require("./db/connection.js");

const getAllDepts = () => {
    db.query(queries.allDepts, (err, res) => {
        if(err) {
            throw(err);
        }
        console.table(res);
    });
};

const getAllRoles = () => {
    db.query(queries.allRoles, (err, res) => {
        if(err) {
            throw(err);
        }
        console.table(res);
    });
};

const getAllEmployees = () => {
    db.query(queries.allEmployees, (err, res) => {
        if(err) {
            throw(err);
        }
        console.table(res);
    });
};

const addDept = (name) => {
    db.query(queries.addDept, [name], (err, res) => {
        if(err) {
            throw(err);
        }
        console.log(`Added ${name} to the database`);
    });
};

const addRole = (title, salary, dept) => {
    db.query(queries.addRole, [title, salary, dept], (err, res) => {
        if(err) {
            throw(err);
        }
        console.log(`Added ${title} to the database`);
    });
};

const addEmployee = (first, last, role, manager) => {
    db.query(queries.addEmployee, [first, last, role, manager], (res, err) => {
        if(err) {
            throw(err);
        }
        console.log(`Added ${first} ${last} to the database`);
    });
};

getAllDepts();
getAllRoles();