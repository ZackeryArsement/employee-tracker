const inquirer = require('inquirer');
const cTable = require('console.table');

// Import query classes
const Database = require('./lib/Database');
const databaseQuery = new Database();

// Initialize user prompt
showPrompt();

// Provide the user with a list of actions to perform
async function showPrompt(){
    const response = await inquirer.prompt(
    {
        type: 'list',
        name: 'selection',
        message: 'What would you like to do?',
        choices: ['View all Departments', 'Add Department', 'View all Roles', 'Add Role', 'View all Employees', 'Update an Employee Role', 'Update an Employee\'s Manager', 'Add Employee']
    });

    // Perform different functions depending on the user selection
    switch(response.selection){
      case 'View all Departments':
        viewDepartments();
        return;

      case 'Add Department':
        addDepartment();
        return;

      case 'View all Roles':
        viewRoles();
        return;

      case 'Add Role':
        addRole();
        return;

      case 'View all Employees':
        viewEmployees();
        return;

      case 'Add Employee':
        addEmployee();
        return;
      
      case 'Update an Employee Role':
        updateRole();
        return;
      
      case 'Update an Employee\'s Manager':
        updateManager();
        return;
      
      };
};

// View all departments in the database
async function viewDepartments(){
  try{
    const data = await databaseQuery.showDepartment();
    console.table(data);
  }
  catch(err){
    console.log(err);
  }
  finally{
    showPrompt()
  }
};

// View all roles in the database with their respective departments and salaries
async function viewRoles(){
  try{
    const data = await databaseQuery.showRoleDisplay();
    console.table(data);
  }
  catch(err){
    console.log(err);
  }
  finally{
    showPrompt()
  }
};

// View all employees along with their department, salary, and manager
async function viewEmployees(){
  try{
    const data = await databaseQuery.showEmployeeDisplay();
    console.table(data);
  }
  catch(err){
    console.log(err);
  }
  finally{
    showPrompt()
  }
};

// Add a department to the database
async function addDepartment(){
  try{
    const dep = await inquirer.prompt(
      {
        type: 'input',
        name: 'department',
        message: 'What is the name of the department you would like to add?'
      }
    ).then((input) => {
      databaseQuery.addDepartment(input.department);
      console.log(`Added ${input.department} to the database`)
    });
  }
  catch(err){
    console.log(err);
  }
  finally{
    showPrompt()
  }
};

// Add a role to the database... including the role salary and department
async function addRole(){
  try{
      const depData = await databaseQuery.showDepartment();
      const depArray = await depData.map(function(value,index) {return value['department']; });
      const idArray = await depData.map(function(value,index) {return value['id']; });

      const dat = await inquirer.prompt([
      {
        type: 'input',
        name: 'title',
        message: 'What is the title of the role?'
      },
      {
        type: 'input',
        name: 'salary',
        message: 'What is the salary of the role?'
      },
      {
        type: 'list',
        name: 'department_id',
        message: 'What department is this role in?',
        choices: depArray
      }
      ]).then((input) => {
      const depID = idArray[depArray.indexOf(input.department_id)];

      databaseQuery.addRole(input.title, parseInt(input.salary), depID);
      console.log(`Added ${input.title} to the database`)
    });
  }
  catch(err){
    console.log(err);
  }
  finally{
    showPrompt()
  }
};

// Add an employee to the database... including its role and manager name
async function addEmployee(){
  try{
      const roleData = await databaseQuery.getRoleData();
      const roleArray = await roleData.map(function(value,index) {return value['title']; });
      const idArray = await roleData.map(function(value,index) {return value['id']; });

      const employeeData = await databaseQuery.getEmployeeData();
      const employeeFirst = await employeeData.map(function(value,index) {return value['first_name']; });

      const dat = await inquirer.prompt([
      {
        type: 'input',
        name: 'first',
        message: 'What is the first name of the employee?'
      },
      {
        type: 'input',
        name: 'last',
        message: 'What is the last name of the employee?'
      },
      {
        type: 'list',
        name: 'role',
        message: 'What role is this for?',
        choices: roleArray
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Does the employee have a manager?',
        choices: ['Yes', 'No']
      },
      {
        type: 'list',
        name: 'manager_id',
        message: 'Who is the manager for the employee (First name)?',
        choices: employeeFirst,
        when: (answers) => answers.manager === 'Yes'
      }
      ]).then((input) => {
      const roleID = idArray[roleArray.indexOf(input.role)];

      if(input.manager === 'Yes'){
        const managerID = idArray[employeeFirst.indexOf(input.manager_id)];

        databaseQuery.addEmployee(input.first, input.last, roleID, managerID);
      }
      else{
        databaseQuery.addEmployee(input.first, input.last, roleID, null);
      }

      console.log(`Added ${input.first} ${input.last} to the database`)
    });
  }
  catch(err){
    console.log(err);
  }
  finally{
    showPrompt()
  }
};

// Update the role of an employee
async function updateRole(){
  const roleData = await databaseQuery.getRoleData();
  const roleArray = await roleData.map(function(value,index) {return value['title']; });
  const idArray = await roleData.map(function(value,index) {return value['id']; });

  const employeeData = await databaseQuery.getEmployeeData();
  const employeeFirst = await employeeData.map(function(value,index) {return value['first_name']; });

  try{
    const dat = await inquirer.prompt([
      {
        type: 'list',
        name: 'first_name',
        message: 'Which employee would you like to update?',
        choices: employeeFirst
      },
      {
        type: 'list',
        name: 'role',
        message: 'What is the new role of the employee?',
        choices: roleArray
      }
      ]).then((input) => {
      const roleID = idArray[roleArray.indexOf(input.role)];

      databaseQuery.updateRole(roleID, input.first_name);
      console.log(`${input.first_name} now has the role of ${input.role}!`)
    });
  }
  catch(err){
    console.log(err);
  }
  finally{
    showPrompt()
  }
};

// Update the manager of an employee
async function updateManager(){
  const employeeData = await databaseQuery.getEmployeeData();
  const employeeFirst = await employeeData.map(function(value,index) {return value['first_name']; });
  const idArray = await employeeData.map(function(value,index) {return value['id']; });

  try{
    const dat = await inquirer.prompt([
      {
        type: 'list',
        name: 'first_name',
        message: 'Which employee would you like to update?',
        choices: employeeFirst
      },
      {
        type: 'list',
        name: 'manager',
        message: 'Who is the new manager of the employee?',
        choices: employeeFirst
      }
      ]).then((input) => {
      const managerID = idArray[employeeFirst.indexOf(input.manager)];
      const id = idArray[employeeFirst.indexOf(input.first_name)];

      databaseQuery.updateManager(managerID, id);
      console.log(`${input.manager} is now the manager of ${input.first_name}!`)
    });
  }
  catch(err){
    console.log(err);
  }
  finally{
    showPrompt()
  }
};