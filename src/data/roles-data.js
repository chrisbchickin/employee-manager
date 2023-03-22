const connection = require('../mysql/connection')
// retreives roles through sequel
const getRoles = (onComplete) => {
    const sql = `SELECT role.id, title, salary, department.name as departmentName
                 FROM role
                 INNER JOIN department ON role.department_id=department.id`
    connection.getConnection().query(
        sql, onComplete
    )
}
//adds role through sequel
const addRole = (role, onComplete) => {
    const sql = `INSERT INTO role(title, salary, department_id)
    VALUES (?, ?, ?)`;
    const params = [role.title, role.salary, role.departmentId];
    connection.getConnection().execute(
        sql, params, (error, result) => {
            onComplete(error, result);
        }
    )
}
module.exports = { getRoles, addRole }