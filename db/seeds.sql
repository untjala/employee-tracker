/* Creates values to be inserted the database */
INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Anna', 'Smith', 9, 4), ('Thomas', 'Barrow', 1, 7), ('Sybil', 'Branson', 5, 2), ('Mary', 'Crawley', 3, 8);

INSERT INTO employee_role(title, salary, department_id)
VALUES ('Software Engineer', 110000, 5), ('UI Developer', 92000, 4), ('Team Lead', 120000, 6), ('Sales Lead', 140000)
INSERT INTO employee_department(department_name)
VALUES ('Product Engineering'), ('Product Management'), ('Sales'), ('UI Development');

/* Creates view all tables */
SELECT employee.id, employee.first_name, employee.last_name, employee.role.title, employee_department.department_name,
employee.role.salary, 
CONCAT(manager.first_name, '', manager.last_name)
AS manager
LEFT JOIN employee manager ON manager.id = employee.manager_id
INNER JOIN employee_role ON employee.role_id = employee_role.id
INNER JOIN employee_department ON employee_department.id = employee_role.department_id

SELECT department_name from employee_department;
SELECT title FROM employee_role