USE employee_db;

/* Creates values to be inserted the database */
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Anna', 'Smith', 2, 5);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Thomas', 'Barrow', 1, 3);
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Sybil', 'Branson', 4, 8); 
INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES ('Mary', 'Crawley', 1, NULL);

INSERT INTO role (title, salary, department_id)
VALUES ('Software Engineer', 110000, 1);
INSERT INTO role (title, salary, department_id)
VALUES ('UI Developer', 92000, 2);
INSERT INTO role (title, salary, department_id)
VALUES ('Team Lead', 120000, 3);
INSERT INTO role (title, salary, department_id)
VALUES ('Sales Lead', 140000, 4);

INSERT INTO department (name)
VALUES ('Product Engineering');
INSERT INTO department (name)
VALUES ('Product Management');
INSERT INTO department (name)
VALUES ('Sales');
INSERT INTO department (name)
VALUES ('UI Development');