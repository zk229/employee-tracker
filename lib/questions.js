exports.menu = [
    {
        type: "list",
        name: "choice",
        message: "Select an option.",
        choices: ["View All Departments", "View All Roles", "View All Employees", "Add a Department", "Add a Role", "Add an Employee", "Update an Employee Role", "End Program"]
    }
];
exports.deptAdd = [
    {
        type: "input",
        name: "name",
        message: "Enter the name of the department."
    }
];
exports.roleAdd = function(depts){
    return [
        {
            type: "input",
            name: "name",
            message: "Enter the name of the role."
        },
        {
            type: "input",
            name: "salary",
            message: "Enter the salary of the role."
        },
        {
            type: "list",
            name: "dept",
            message: "Choose the department this role belongs to.",
            choices: depts
        }
    ];
}
exports.employeeAdd = function(roles, employees) {
    employees = employees.concat(["None"]);
    return [
        {
            type: "input",
            name: "first",
            message: "Enter the employee's first name."
        },
        {
            type: "input",
            name: "last",
            message: "Enter the employee's last name."
        },
        {
            type: "list",
            name: "role",
            message: "Choose the employee's role.",
            choices: roles
        },
        {
            type: "list",
            name: "manager",
            message: "Choose the employee's manager.",
            choices: employees
        }
    ];
}
exports.employeeUpdate = function(employees, roles) {
    return [
        {
            type: "list",
            name: "employee",
            message: "Choose an employee.",
            choices: employees
        },
        {
            type: "list",
            name: "role",
            message: "Choose the employee's new role.",
            choices: roles
        }
    ];
}