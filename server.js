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

// db.connect(function (err) {
//   if (err) throw err;
//   starterPrompt();
// });

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
      if (answer.startOptions === 'View all employees') {viewEmployees(); }
      if (answer.startOptions === 'View all roles') {viewRoles(); }
      if (answer.startOptions === 'View all departments') {viewDepartments(); }
      if (answer.startOptions === 'Add a department') {addDepartment(); }
      if (answer.startOptions === 'Add a role') {addRole(); }
      if (answer.startOptions === 'Add an employee') {addEmployee(); }
      if (answer.startOptions === 'Update employee role') {updateRole(); }
      if (answer.startOptions === 'Quit') {db.end(); }
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

const addRole = () => {
  console.log('Alright! Please enter the employee info:')
  const query =
    `SELECT role.id, role.title, role.salary
    FROM role`
  db.query(query, function (err, results) {
    if (err) throw err;
    const addedRole = results.map(({ id, title, salary }) => ({
      value: id, title: `${title}`, salary: `${salary}`
    })
    );
    console.table(results);
    secondaryPrompt(addedRole)
  });
}
const secondaryPrompt = (addedRole) => {
  inquirer.prompt([
    {
      type: 'input',
      name: 'first_name',
      message: 'What is the employee\'s first name?'
    },
    {
      type: 'input',
      name: 'last_name',
      message: 'What is the employee\'s last name?'
    },
    {
      type: 'rawlist',
      name: 'role_id',
      message: 'What is the employee\'s role?',
      choices: addedRole
    },
  ])
  .then(function (answer) {
    console.table(answer);

    const query = `INSERT INTO employee SET ?`
    db.query(query,
      {
        first_name: answer.first_name,
        last_name: answer.last_name,
        role_id: answer.role_id,
      },
      function (err, results) {
        if (err) throw (err);
        console.table(results);
      startPrompts();
      });
    });
}
// const addRole = () => {

//   }
//   const addEmployee = () => {

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