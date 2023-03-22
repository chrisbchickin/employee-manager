const inquirer = require('inquirer');
const depData = require('../data/departments-data')
// retreives departments through sequel
const viewAllDepartments = (onComplete) => {
    depData.getDepartments((error, departments) => {
        if (error) {
            console.log(error);
        } else {
            console.table(departments);
        }
        onComplete();
    });
}
//adds department through sequel
const addDepartmentPromt = (onComplete) => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the department name?',
                name: 'department',
              }
        ])
        .then((answers) => { 
            depData.addDepartment(answers.department, (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    console.table(result);
                }
                onComplete();
            });
        })
}

module.exports = { viewAllDepartments, addDepartmentPromt };