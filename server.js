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
      'Update employee role',
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
};
// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
const viewEmployees = () => {
  db.query('SELECT * FROM employee',
    function (error, results) {
      if (error) return console.error(error);
      console.table(results);
      startPrompts();
    });
}
// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
const viewRoles = () => {
  db.query('SELECT * FROM role',
    function (error, results) {
      if (error) return console.error(error);
      console.table(results);
      startPrompts();
    });
}
// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
const viewDepartments = () => {
  db.query('SELECT * FROM department',
    function (error, results) {
      if (error) return console.error(error);
      console.table(results);
      startPrompts();
    });
}

//Function to add a new employee
const addEmployee = () => {
  console.log('Add employee')
  const query =
  //Collabrated with a classmate to find query solution
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
        function (error, results) {
          if (error) throw error;
          console.table(results);
          console.log('Added! All set!');

          startPrompts();
        });
    });
}
//Function to add a new role
const addRole = () => {
  console.log('Okay! What role would you like to add?')
  const query =
    `SELECT d.id, d.name, r.salary
    FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d 
    ON d.id = r.department_id
    GROUP BY d.id, d.name, r.salary`
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
          function (error, results) {
            if (error) throw error;
            console.table(results);
            console.log('Added! All set!');

            startPrompts();
          });
      });
  }
}

//Function to add a new department
const addDepartment = () => {
  console.log('Add a new department!')

  inquirer.prompt([
    {
      type: 'input',
      name: 'departmentName',
      message: 'What is the department\'s name?'
    },
  ])
    .then(function (answer) {
      console.table(answer);
      const query =
        `INSERT INTO department SET ?`
      db.query(query,
        {
          name: answer.departmentName
        },
        function (error, results) {
          if (error) throw error;
          console.table(results);
          console.log('Added! All set!');

          startPrompts();
        });
    });
}
//Function to update a pre-existing employee's role
const updateRole = () => {
  console.log('Okay! What role would you like to update?')
  const query =
    `SELECT e.id, e.first_name, e.last_name, r.title, d.name AS DEPARTMENT, r.salary
    FROM employee e
    JOIN role r
    ON e.role_id = r.id
    JOIN department d 
    ON d.id = r.department_id
    JOIN employee m
    ON m.id = e.manager_id`

  db.query(query, function (error, result) {
    if (error) throw error;
    const updatedEmp = result.map(({ id, first_name, last_name}) => ({
      value: id, name: `${first_name} ${last_name}`
    }));
    console.table(result)
    newEmp(updatedEmp);
  });
}
const newEmp = (updatedEmp) => {
  const query = `SELECT r.id, r.title, r.salary FROM role r`
  
  db.query(query, function (error, result) {
    if (error) throw error;

    selectRole = result.map(({id, title, salary}) => ({
      value: id, title: `${title}`, salary: `${salary}`
    }));
    console.table(result)

    updatedEmpPrompt(updatedEmp, selectRole);
  })
};
const updatedEmpPrompt = (updatedEmp, selectRole) => {
  inquirer.prompt([
    {
      type: 'list',
      name: 'empId',
      message: 'Which employee\'s role would you like to change?',
      choices: updatedEmp
    },
    {
      type: 'list',
      name: 'roleId',
      message: 'What is the employee\'s new role?',
      choices: selectRole
    }
  ])
    .then(function (answer) {
      console.log(answer);
      const query =
        `UPDATE employee SET role_id = ? WHERE id = ?`
        
      db.query(query,
        [answer.roleId, answer.empId],
        function (error, results) {
          if (error) throw error;
          console.table(results);
          console.log('Added! All set!');

          startPrompts();
        });
    });
}
startPrompts();