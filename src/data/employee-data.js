const connection = require('../mysql/connection')
// retreives employees through sequel
const getEmployees = (onComplete) => {
    const sql = `SELECT employee.id, employee.first_name as firstName, 
                        employee.last_name as lastName, role.title as roleTitle,
                        manager.first_name as managerName 
                 FROM employee
                 INNER JOIN role ON employee.role_id=role.id
                 LEFT JOIN employee manager ON employee.manager_id=manager.id`
    connection.getConnection().query(
        sql, onComplete
    )
}
//adds employee through sequel
const addEmployee = (employee, onComplete) => {
    const sql = `INSERT INTO employee (first_name, last_name, role_id, manager_id)
    VALUES (?, ?, ?, ?)`;
    const params = [employee.firstName, employee.lastName, employee.roleId, employee.managerId];
    connection.getConnection().execute(
        sql, params, (error, result) => {
            onComplete(error, result);
        }
    )
}

const updateEmployee = (employee, onComplete) => {
    const sql = `UPDATE employee 
                 SET role_id = ?
                 WHERE id = ?`;
    const params = [employee.roleId, employee.id];
    connection.getConnection().execute(
        sql, params, (error, result) => {
            onComplete(error, result);
        }
    )
}
module.exports = { getEmployees, addEmployee, updateEmployee }