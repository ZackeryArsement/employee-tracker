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

class Departments{
    showTable(){
        const sql = `SELECT id, department_name AS department FROM departments`;

        db.query(sql, function (err, results) {
            const table = cTable.getTable(results);
            console.log(table);
          });
        return;
    }

}

module.exports = Departments;