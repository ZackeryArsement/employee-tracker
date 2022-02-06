const mysql = require('mysql2');
const cTable = require('console.table');
const util = require('util');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'tracker_db'
    }
);

// Turn the db.query into a promis so we can 'await' the method in our server.js
const promise = util.promisify(db.query).bind(db);

class Database{
  
  // Get data from departments table
  showDepartment(){
    const sql = `SELECT id, department_name AS department FROM departments`;

    return promise(sql);
  }

  // Get data from roles table
  getRoleData(){
    const sql = `SELECT * FROM roles`;

    return promise(sql);
  }

  // Get data from employees table
  getEmployeeData(){
    const sql = `SELECT * FROM employees`;

    return promise(sql);
  }

  // Show roles table joined with departments table
  showRoleDisplay(){
    const sql = `SELECT roles.id, roles.title, departments.department_name AS department, roles.salary
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id`;

    return promise(sql);
  }

  // Show employees table joined with the roles and departments table
  showEmployeeDisplay(){
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, CONCAT(second.first_name," ", second.last_name) AS Manager
    FROM employees 
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT JOIN employees second ON second.id = employees.manager_id`;

    return promise(sql);
  }

  // Add a department to the database
  addDepartment(department){
    const sql = `INSERT INTO departments (department_name)
    VALUES (?)`

    return promise(sql, department);
  }

  // Add a role to the database
  addRole(title, salary, department_id){
    const sql = `INSERT INTO roles (title, salary, department_id)
    VALUES (?, ?, ?)`

    return promise(sql, [title, salary, department_id]);
  }

  // Add a role to the database
  addEmployee(first_name, last_name, role_id, manager_id){
    const sql = `INSERT INTO employees (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`

    return promise(sql, [first_name, last_name, role_id, manager_id]);
  }

  // Update the role of an employee
  updateRole(role_id, first_name){
    const sql = `UPDATE employees
    SET role_id = ?
    WHERE first_name = ?`

    return promise(sql, [role_id, first_name]);
  }
}

module.exports = Database;