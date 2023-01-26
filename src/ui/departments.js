const inquirer = require('inquirer');
const depData = require('../data/departments-data')

const viewAllDepartments = (onComplete) => {
    const departments = depData.getDepartments();
    console.table(departments);
    onComplete();
}

const addDepartmentPromt = (onComplete) => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the department name?',
                name: 'department',
              },
              {
                type: 'input',
                message: 'What is not the department name?',
                name: 'notdepartment',
              },
        ])
        .then((answers) => {
            depData.addDepartment(answers.department);
            console.log(answers);
            onComplete();
        })
}

module.exports = { viewAllDepartments, addDepartmentPromt };