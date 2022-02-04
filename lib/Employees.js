const mysql = require('mysql2');
const cTable = require('console.table');

const db = mysql.createConnection(
    {
        host: 'localhost',
        user: 'root',
        password: 'root',
        database: 'tracker_db'
    }
);

class Employees{
    showTable(){
        const sql = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary
        FROM employees
        LEFT JOIN roles
        ON employees.role_id = roles.id`;

        db.query(sql, function (err, results) {
            const table = cTable.getTable(results);
            const sql2 = `SELECT employees.id, employees.first_name, employees.last_name, roles.title, roles.salary
            FROM employees
            LEFT JOIN roles
            ON employees.role_id = roles.id`;
            console.log(table.id);
          });
        return;
    }

}

module.exports = Employees;