const inquirer = require('inquirer');
const cTable = require('console.table');

// Import query classes
const Database = require('./lib/Database');
const databaseQuery = new Database();

showPrompt();

async function showPrompt(){
    const response = await inquirer.prompt(
    {
        type: 'list',
        name: 'selection',
        message: 'What would you like to do?',
        choices: ['View all Departments', 'Add Department', 'View all Roles', 'Add Role', 'View all Employees', 'Update an Employee Role', 'Add Employee']
    });

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
      };
};

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

async function deleteDepartment(){
  try{
    const depData = await databaseQuery.showDepartment();
    const depArray = await depData.map(function(value,index) {return value['department']; });
    const idArray = await depData.map(function(value,index) {return value['id']; });

    // Arrays associated to roles.id and roles.department_id
    const roleData = await databaseQuery.getRoleData();
    const roleDepArray = await roleData.map(function(value,index) {return value['department_id']; });
    const roleIDArray = await roleData.map(function(value,index) {return value['id']; });


    const dep = await inquirer.prompt(
      {
        type: 'list',
        name: 'title',
        message: 'What department would you like to delete?',
        choices: depArray
      }
    ).then((input) => {
      // The departments id associated to the selected department name
      const depID = idArray[depArray.indexOf(input.title)];
      console.log(depID);
      console.log(roleDepArray);

      // If there are any roles associated to selected department ID then delete each row
      while(roleDepArray.indexOf(depID) > 0){
        console.log('ran');
        databaseQuery.deleteRole(roleIDArray[roleDepArray.indexOf(depID)]);
      }

      // Find the department that has an id that shares the same index as the chosen department_name
      databaseQuery.deleteDepart(depID);
      console.log(`Deleted ${input.title} from the database`)
    });
  }
  catch(err){
    console.log(err);
  }
  finally{
    showPrompt()
  }
};

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
}