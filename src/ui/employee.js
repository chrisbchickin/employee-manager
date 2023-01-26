const inquirer = require('inquirer');
const empData = require('../data/employee-data')

const viewAllEmployees = (onComplete) => {
    const employees = empData.getEmployee();
    console.table(employees);
    onComplete();
}

const addEmployeePromt = (onComplete) => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the employee name?',
                name: 'employee',
              },
              {
                type: 'input',
                message: 'What is not the employee name?',
                name: 'notemployee',
              },
        ])
        .then((answers) => {
            empData.addEmployee(answers.employee);
            console.log(answers);
            onComplete();
        })
}

module.exports = { viewAllEmployees, addEmployeePromt };