//Required Dependencies
const inquirer = require('inquirer');
const mysql = require('mysql2');
require('console.table')
//SQL database connection 
const db = mysql.createConnection(
  {
    host: 'localhost',
    user: 'root',
    password: '',
    database: 'employee_db',
  },
);
//Start of inquirer prompts
const startPrompts = () => {
  inquirer.prompt({
    type: 'list',
    name: 'startOptions',
    message: 'Welcome! What would you like to do?',
    choices: [
      'View all employees',
      'View all roles',
      'View all departments',
      'Add a department',
      'Add a role',
      'Add an employee',
      'Update an employee role',
      'Quit',
    ]
  })
    //Returns prompts based on user response 
    .then(answer => {
      if (answer.startOptions === 'View all employees') { viewEmployees(); }
      if (answer.startOptions === 'View all roles') { viewRoles(); }
      if (answer.startOptions === 'View all departments') { viewDepartments(); }
      if (answer.startOptions === 'Add a department') { addDepartment(); }
      if (answer.startOptions === 'Add a role') { addRole(); }
      if (answer.startOptions === 'Add an employee') { addEmployee(); }
      if (answer.startOptions === 'Update employee role') { updateRole(); }
      if (answer.startOptions === 'Quit') { db.end(); }
    })
}
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const viewEmployees = () => {
  db.query('SELECT * FROM employee',
    function (err, results) {
      if (err) return console.error(err);
      console.table(results);
      startPrompts();
    });
}
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
const viewRoles = () => {
  db.query('SELECT * FROM role',
    function (err, results) {
      if (err) return console.error(err);
      console.table(results);
      startPrompts();
    });
}
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
const viewDepartments = () => {
  db.query('SELECT * FROM department',
    function (err, results) {
      if (err) return console.error(err);
      console.table(results);
      startPrompts();
    });
}

const addEmployee = () => {
  console.log('Add employee')
  const query =
    `SELECT r.id, r.title, r.salary
      FROM r`
  db.query(query, function (error, res) {
    if (error) throw error;

    const seletRole = res.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`
    }));
    console.table(res);
    addEmpPropmt(seletRole);
  })
}
const addEmpPropmt = (seletRole) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'newFirst',
      message: 'What is the employee\'s first name?'
    },
    {
      type: 'input',
      name: 'newLast',
      message: 'What is the employee\'s last name?'
    },
    {
      type: 'list',
      name: 'newRole',
      message: 'What is the employee\'s role ID?',
      choices: seletRole
    },
  ])
    .then(function (answer) {
      console.table(answer);
      const query =
        `INSERT INTO employee SET ?`
      db.query(query,
        {
          first_name: answer.newFirst,
          last_name: answer.newLast,
          role_id: answer.newRole
        },
        function (err, results) {
          if (err) throw err;
          console.table(results);
          console.log('Added! All set!');

          startPrompts();
        });
    });
}

const addRole = () => {
  console.log('Okay! What role would you like to add?')
  const query =
  //Collabrated with a classmate to find query solution
    `SELECT d.id, d.name, r.salary
    FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d 
    ON d.id = r.department_id
    GROUP BY d.id, d.name`
  db.query(query, function (error, res) {
    if (error) throw error;

    const departmentChoice = res.map(({ id, name }) => ({
      value: id, name: `${id}, ${name}`
    }));
    console.table(res)
    addRolePrompt(departmentChoice);
  });

  const addRolePrompt = (departmentChoice) => {
    inquirer.prompt([
      {
        type: 'input',
        name: 'newTitle',
        message: 'What is the title of the role?'
      },
      {
        type: 'input',
        name: 'newSalary',
        message: 'What is the salary for this role?'
      },
      {
        type: 'list',
        name: 'departmentId',
        message: 'What department does this role belong to?',
        choices: departmentChoice
      },
    ])
    .then(function (answer) {
      console.table(answer);
      const query =
        `INSERT INTO role SET ?`
      db.query(query,
        {
          title: answer.newTitle,
          salary: answer.newSalary,
          department_id: answer.departmentId
        },
        function (err, results) {
          if (err) throw err;
          console.table(results);
          console.log('Added! All set!');

          startPrompts();
        });
    });
  }
}
//   }
//   const updateEmployee = () => {

//   }
//   const updateRole = () => {

//   }
startPrompts();
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database