exports.allDepts = `SELECT * FROM department`;
exports.allRoles = `SELECT role.title AS title, 
                        role.id AS role_id, 
                        department.name AS department, 
                        role.salary AS salary FROM role 
                        JOIN department ON role.department_id = department.id`;
exports.allEmployees = `SELECT A.id AS employee_id,
                                A.first_name AS first_name,
                                A.last_name AS last_name,
                                role.title AS role,
                                role.salary AS salary,
                                B.first_name AS manager_first_name,
                                B.last_name AS manager_last_name
                                FROM employee A 
                                LEFT JOIN role ON A.role_id = role.id
                                LEFT JOIN employee B ON A.manager_id = B.id`;
exports.addDept = `INSERT INTO department(name) VALUES (?)`;
exports.addRole = `INSERT INTO role(title, salary, department_id) VALUES (?, ?, ?)`;
exports.addEmployee = `INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES (?, ?, ?, ?)`;
exports.updateEmployee = `UPDATE employee SET role_id = ? WHERE id = ?`;