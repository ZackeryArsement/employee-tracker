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

const promise = util.promisify(db.query).bind(db);

class Database{
  showDepartment(){
    const sql = `SELECT id, department_name AS department FROM departments`;

    return promise(sql);
  }

  showRole(){
    const sql = `SELECT roles.id, roles.title, departments.department_name AS department, roles.salary
    FROM roles
    LEFT JOIN departments
    ON roles.department_id = departments.id`;
    return promise(sql);
  }

  showEmployee(){
    const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, departments.department_name, roles.salary, CONCAT(second.first_name," ", second.last_name) AS Manager
    FROM employees 
    LEFT JOIN roles
    ON employees.role_id = roles.id
    LEFT JOIN departments
    ON roles.department_id = departments.id
    LEFT JOIN employees second ON second.id = employees.manager_id`;

    return promise(sql);
  }
}

module.exports = Database;

// updateTableValue([genre, name]){
//   return `UPDATE song_db
//   SET genre = ?
//   WHERE author = ?`
// }