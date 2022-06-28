USE employee_db;
/* Creates values to be inserted the database */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Anna', 'Smith', 2, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Thomas', 'Barrow', 1, null);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Sybil', 'Branson', 4, null); 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mary', 'Crawley', 1, 8,);

INSERT INTO role(title, salary, department_id)
VALUES ('Software Engineer', 110000, 5), ('UI Developer', 92000, 4), ('Team Lead', 120000, 6), ('Sales Lead', 140000, 7);

INSERT INTO department(name)
VALUES ('Product Engineering'), ('Product Management'), ('Sales'), ('UI Development');

/* Creates view all tables */
SELECT employee.id, employee.first_name, employee.last_name, role.title, department.name, role.salary, 
CONCAT(manager.first_name, ' ', manager.last_name) AS manager
FROM employee

LEFT JOIN employee manager ON manager.id = employee.manager_id
INNER JOIN role ON employee.role_id = role.id
INNER JOIN department ON department.id = role.department_id;

SELECT department_name from department;
SELECT title FROM role;