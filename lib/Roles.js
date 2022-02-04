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

class Roles {
    showTable(){
        const sql = `SELECT roles.id, roles.title, departments.department_name AS department, roles.salary
        FROM roles
        LEFT JOIN departments
        ON roles.department_id = departments.id`;

        db.query(sql, function (err, results) {
            const table = cTable.getTable(results);
            console.log(table);
        });
        
        return;
    }

}

module.exports = Roles;