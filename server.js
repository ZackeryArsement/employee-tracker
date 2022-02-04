const inquirer = require('inquirer');
const cTable = require('console.table');

// Import query classes
const Database = require('./lib/Database');
const Departments = require('./lib/Departments');
const Roles = require('./lib/Roles');
const Employees = require('./lib/Employees');

const databaseQuery = new Database();
const roleQuery = new Roles();
const employeeQuery = new Employees();


async function showPrompt(){
    const response = await inquirer.prompt(
    {
        type: 'list',
        name: 'selection',
        message: 'What would you like to do?',
        choices: ['View all Departments','Add Department','View all Roles','Add Role','View all Employees','Update an Employee Role','Add Employee']
    });

    switch(response.selection){
      case 'View all Departments':
        callDepartment();
        return;

      case 'View all Roles':
        callRole();
        return;

      case 'View all Employees':
        callEmployee();
        return;
      };
};

async function callDepartment(){
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

async function callRole(){
  try{
    const data = await databaseQuery.showRole();
    console.table(data);
  }
  catch(err){
    console.log(err);
  }
  finally{
    showPrompt()
  }
};

async function callEmployee(){
  try{
    const data = await databaseQuery.showEmployee();
    console.table(data);
  }
  catch(err){
    console.log(err);
  }
  finally{
    showPrompt()
  }
};

showPrompt();