const inquirer = require("inquirer");

function showPrompt(){
    inquirer.prompt(
    {
        type: 'list',
        name: 'selection',
        message: 'What would you like to do?',
        choices: ['View all Departments','Add Department','View all Roles','Add Role','View all Employees','Update an Employee Role','Add Employee']
    }
    )
}