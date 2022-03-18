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
        menu();
    });
};

const getAllRoles = () => {
    db.query(queries.allRoles, (err, res) => {
        if(err) {
            throw(err);
        }
        console.table(res);
        menu();
    });
};

const getAllEmployees = () => {
    db.query(queries.allEmployees, (err, res) => {
        if(err) {
            throw(err);
        }
        console.table(res);
        menu();
    });
};

const addDept = (name) => {
    db.query(queries.addDept, [name], (err, res) => {
        if(err) {
            throw(err);
        }
        console.log(`Added ${name} to the database`);
        menu();
    });
};

const addRole = (title, salary, dept) => {
    db.query(queries.addRole, [title, salary, dept], (err, res) => {
        if(err) {
            throw(err);
        }
        console.log(`Added ${title} to the database`);
        menu();
    });
};

const addEmployee = (first, last, role, manager) => {
    db.query(queries.addEmployee, [first, last, role, manager], (res, err) => {
        if(err) {
            throw(err);
        }
        console.log(`Added ${first} ${last} to the database`);
        menu();
    });
};

const updateEmployee = (role, id) => {
    db.query(queries.updateEmployee, [role, id], (res, err) => {
        if(err) {
            throw(err);
        }
        console.log("Role updated!");
        menu();
    })
}

const deptQuestion = () => {
    inquirer.prompt(questions.deptAdd).then(answers => {
        addDept(answers.name);
    });
};

const roleQuestion = () => {
    db.query(queries.allDepts, (err, res) => {
        if(err) {
            throw(err);
        }
        let depts = [];
        res.forEach(item => depts.push(item.id.toString() + ". " +  item.name));
        //console.log(depts);
        inquirer.prompt(questions.roleAdd(depts)).then(answers => {
            addRole(answers.name, answers.salary, parseInt(answers.dept.substring(0, answers.dept.indexOf("."))));
        });
    });
};

const employeeQuestion = () => {

};

const updateQuestion = () => {

};

const menu = () => {
    inquirer.prompt(questions.menu).then(answers => {
        switch(answers.choice) {
            case "View All Departments":
                getAllDepts();
                break;
            case "View All Roles":
                getAllRoles();
                break;
            case "View All Employees":
                getAllEmployees();
                break;
            case "Add a Department":
                deptQuestion();
                break;
            case "Add a Role":
                roleQuestion();
                break;
            case "Add an Employee":
                employeeQuestion();
                break;
            case "Update an Employee":
                updateQuestion();
                break;
            case "End Program":
                db.end();
                break;
        }
    });
};

menu();