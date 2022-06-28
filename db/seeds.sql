INSERT INTO employee(first_name, last_name, role_id, manager_id)
VALUES ('Jane', 'Parker', 9, 4);

INSERT INTO employee_role(title, salary, department_id)
VALUES ('Software Engineer', 110000, 5), ('UI Developer', 92000, 4), ('Team Lead', 120000, 6), ('')
INSERT INTO employee_department(department_name)
VALUES ('Product Engineering'), ('Product Management'), ('Sales'), ('UI Development');

SELECT employee.id, employee.first_name, employee.last_name, employee.role.title, employee_department.department_name,
employee.role.salary, 
CONCAT(manager.first_name, '', manager.last_name)
AS manager