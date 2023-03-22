const mysql = require("mysql2");

let connection = null;

const getConnection = () => {
    if (!connection) {
        connection = mysql.createConnection(
            {
              host: 'localhost',
              // MySQL username,
              user: 'root',
              // MySQL password
              password: 'your password here',
              database: 'Employee_Management_db',
              insecureAuth: true,

            },
          );
    }
    return connection;
}

const closeConnection = () => {
    if (connection) {
        connection.destroy();
    }
}

module.exports = { getConnection, closeConnection };