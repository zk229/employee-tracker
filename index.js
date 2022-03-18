const mysql = require("mysql2");
const inquirer = require("inquirer");
const questions = require("./lib/questions");
const queries = require("./lib/queries");
const cTable = require("console.table");
const db = require("./db/connection.js");

// display all departments
const getAllDepts = () => {
    db.query(queries.allDepts, (err, res) => {
        console.table(res);
        menu();
    });
};

// display all roles
const getAllRoles = () => {
    db.query(queries.allRoles, (err, res) => {
        console.table(res);
        menu();
    });
};

// display all employees
const getAllEmployees = () => {
    db.query(queries.allEmployees, (err, res) => {
        console.table(res);
        menu();
    });
};

// add a new department
const addDept = (name) => {
    db.query(queries.addDept, [name], (err, res) => {
        console.log(`Added ${name} to the database`);
        menu();
    });
};

// add a new role
const addRole = (title, salary, dept) => {
    db.query(queries.addRole, [title, salary, dept], (err, res) => {
        console.log(`Added ${title} to the database`);
        menu();
    });
};

// add a new employee
const addEmployee = (first, last, role, manager) => {
    db.query(queries.addEmployee, [first, last, role, manager], (res, err) => {
        console.log(`Added ${first} ${last} to the database`);
        menu();
    });
};

// change an employee's role
const updateEmployee = (role, id) => {
    db.query(queries.updateEmployee, [role, id], (res, err) => {
        console.log("Role updated!");
        menu();
    })
}

// prompts for information for a new department
const deptQuestion = () => {
    inquirer.prompt(questions.deptAdd).then(answers => {
        addDept(answers.name);
    });
};

// prompts for information for a new role
const roleQuestion = () => {
    db.query(queries.allDepts, (err, res) => {
        let depts = [];
        res.forEach(item => depts.push(item.id.toString() + ". " +  item.name));
        //console.log(depts);
        inquirer.prompt(questions.roleAdd(depts)).then(answers => {
            addRole(answers.name, answers.salary, parseInt(answers.dept.substring(0, answers.dept.indexOf("."))));
        });
    });
};

// prompts for information for a new employee
const employeeQuestion = () => {
    db.query(queries.allRoles, (err, res) => {
        let roles = [];
        res.forEach(item => roles.push(item.role_id.toString() + ". " + item.title));
        db.query(queries.allEmployees, (err, res) => {
            let employees = [];
            res.forEach(item => employees.push(item.employee_id.toString() + ". " + item.first_name + " " + item.last_name));
            inquirer.prompt(questions.employeeAdd(roles, employees)).then(answers => {
                answers.role = parseInt(answers.role.substring(0, answers.role.indexOf(".")));
                if(answers.manager === "None") {
                    answers.manager = null;
                }
                else {
                    answers.manager = parseInt(answers.manager.substring(0, answers.manager.indexOf(".")));
                }
                addEmployee(answers.first, answers.last, answers.role, answers.manager);
            });
        });
    });
};

// prompts for information for changing an employee's role
const updateQuestion = () => {
    db.query(queries.allEmployees, (err, res) => {
        let employees = [];
        res.forEach(item => employees.push(item.employee_id.toString() + ". " + item.first_name + " " + item.last_name));
        db.query(queries.allRoles, (err, res) => {
            let roles = [];
            res.forEach(item => roles.push(item.role_id.toString() + ". " + item.title));
            inquirer.prompt(questions.employeeUpdate(employees, roles)).then(answers => {
                answers.role = parseInt(answers.role.substring(0, answers.role.indexOf(".")));
                answers.employee = parseInt(answers.employee.substring(0, answers.employee.indexOf(".")));
                updateEmployee(answers.role, answers.employee);
            });
        });
    });
};

// prompt for user to choose what action they want to do
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
            case "Update an Employee Role":
                updateQuestion();
                break;
            case "End Program":
                db.end();
                break;
        }
    });
};

menu();