// query string to view all departments
exports.allDepts = `SELECT * FROM department`;

// query string to view all roles along with their department name
exports.allRoles = `SELECT role.title AS title, 
                        role.id AS role_id, 
                        department.name AS department, 
                        role.salary AS salary FROM role 
                        JOIN department ON role.department_id = department.id`;

// query string to view all employees along with their role title and salary as well as their manager's name
exports.allEmployees = `SELECT A.id AS employee_id,
                                A.first_name AS first_name,
                                A.last_name AS last_name,
                                role.title AS role,
                                role.salary AS salary,
                                CONCAT(B.first_name, " ", B.last_name) AS manager
                                FROM employee A 
                                LEFT JOIN role ON A.role_id = role.id
                                LEFT JOIN employee B ON A.manager_id = B.id`;

// query strings to add records to the database
exports.addDept = `INSERT INTO department(name) VALUES (?)`;
exports.addRole = `INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)`;
exports.addEmployee = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;

// query string to change the role of an employee
exports.updateEmployee = `UPDATE employee SET role_id = ? WHERE id = ?`;