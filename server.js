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
    database: 'employee_db'
  },
);

//Start of inquirer prompts
const startPrompts = () => {
    console.log('Welcome! Let\'s get started!')
    inquirer.prompt({
        type: 'rawlist',
        name: 'startOptions',
        message: 'Welcome! What would you like to do?',
        choices: [
            'View all departments',
            'View all roles',
            'View all employees',
            'Add a department',
            'Add a role',
            'Add an employee',
            'Update an employee role',
            'Quit'
        ]
    })
    //Returns prompts based on user response 
    .then(answer => {
        if (answer.startPrompts === 'View all departments') 
        { return viewDepartments(); }
        if (answer.startPrompts === 'View all roles') 
        { return viewRoles(); }
        if (answer.startPrompts === 'View all employees') 
        { return viewEmployees(); }
        if (answer.startPrompts === 'Add a department') 
        {return addDepartment();}
        if (answer.startPrompts === 'Add a role') 
        {return addRole();}
        if (answer.startPrompts === 'Add an employee') 
        {return addEmployee();}
        if (answer.startPrompts === 'Update employee role') 
        {return updateRole();}
        if (answer.startPrompts === 'Quit') 
        {return db.end();}
    })
}
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const viewEmployees = () => {
  db.query('SELECT * FROM employee',
  function (err, results) {
    if (err) return console.error(err);
    console.table(results);
    return startPrompts;
  });
}
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
const viewRoles = () => {
  db.query('SELECT * FROM role',
    function (err, results) {
      if (err) return console.error(err);
      console.table(results);
      return startPrompts;
    });
}
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
const viewDepartments = () => {
  db.query('SELECT * FROM department',
    function (err, results) {
      if (err) return console.error(err);
      console.table(results);
      return startPrompts;
    });
}

// const addDepartment = () => {

// }
// const addRole = () => {

// }
// const addEmployee = () => {

// }
// const updateRole = () => {

// }
startPrompts();
// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database