INSERT INTO department(name) VALUES
    ("Development"),
    ("Human Resources"),
    ("Marketing"),
    ("IT");

INSERT INTO role(title, salary, department_id) VALUES 
    ("Junior Developer", 75000.00, 1),
    ("Senior Developer", 100000.00, 1),
    ("Hiring Specialist", 60000.00, 2),
    ("Salesperson", 60000.00, 3),
    ("Graphic Designer", 75000.00, 3),
    ("Junior IT", 60000.00, 4),
    ("Senior IT", 80000.00, 4);

INSERT INTO employee(first_name, last_name, role_id, manager_id) VALUES
    ("Albert", "Einstein", 2, NULL),
    ("Bob", "McKenzie", 1, 1),
    ("Cameron", "Diaz", 1, 1),
    ("Douglas", "Adams", 3, NULL),
    ("Emily", "Dickinson", 4, NULL),
    ("Franz", "Ferdinand", 5, NULL),
    ("Gary", "Oak", 7, NULL),
    ("Horace", "Mann", 6, 7),
    ("Ingrid", "Bergman", 6, 7);