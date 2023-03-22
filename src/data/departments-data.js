const connection = require('../mysql/connection')

const getDepartments = (onComplete) => {
    const sql = `SELECT id, name FROM department`
    connection.getConnection().query(
        sql, (error, result) => {
            onComplete(error, result);
        } 
    )
}

const addDepartment = (name, onComplete) => {
    const sql = `INSERT INTO department (name)
    VALUES (?)`;
    const params = [name];
    connection.getConnection().query(
        sql, params, (error, result) => {
            onComplete(error, result);
        }
    )
}



module.exports = { getDepartments, addDepartment }