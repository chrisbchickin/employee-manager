const inquirer = require('inquirer');
const deptPromts = require('./ui/departments');
const empPromts = require('./ui/employee');
const rolePromts = require('./ui/roles');
const connection = require('./mysql/connection')
//start app function
const home = () => {
    //prompts initial action
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What would you like to do?',
                name: 'menuChoice',
                choices: ['view all departments',
                    'view all roles',
                    'view all employees',
                    'add a department',
                    'add a role',
                    'add an employee',
                    'update an employee role',
                    'exit'
                ]
            }
        ])
        // displays info or prompts secondary action
        .then(
            (answers) => {
                console.log(answers);
                if (answers.menuChoice === 'view all departments') {
                    deptPromts.viewAllDepartments(home);
                } else if (answers.menuChoice === 'add a department') {
                    deptPromts.addDepartmentPromt(home);
                } else if (answers.menuChoice === 'view all roles') {
                    rolePromts.viewAllRoles(home);
                } else if (answers.menuChoice === 'add a role') {
                    rolePromts.addRolePrompt(home);
                } else if (answers.menuChoice === 'view all employees') {
                    empPromts.viewAllEmployees(home);
                } else if (answers.menuChoice === 'add an employee') {
                    empPromts.addEmployeePromt(home);
                } else if (answers.menuChoice === 'update an employee role') {
                    empPromts.updateEmployeePromt(home);
                } else if (answers.menuChoice === 'exit') {
                    connection.closeConnection();
                }
            } 
        )
        .catch((err)=> {console.log(`error: ${err}`)})
}

//run start function
home();