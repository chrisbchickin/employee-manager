const inquirer = require('inquirer');
const roleData = require('../data/roles-data')
const deptData = require('../data/departments-data');
// retrieves roles through sql
const viewAllRoles = (onComplete) => {
    roleData.getRoles((error, roles) => {
        if (error) {
            console.log(error);
        } else {
            console.table(roles);
        }
        onComplete();
    });
}
// adds role
const addRolePrompt = (onComplete) => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the role name?',
                name: 'title',
            },
            {
                type: 'input',
                message: 'What is the salary?', 
                name: 'salary'
            },
            {
                type: 'list',
                message: 'What department does this role belong to?',
                name: 'departmentId',
                choices: function (answers) {
                    //Not using promises since we aren't using promises anywhere else.
                    const done = this.async();

                    deptData.getDepartments((error, departments) => {
                        if (error) { 
                            console.log(error);
                            done(error);
                        } else {
                            const choices = departments.map((department) => {
                                return {
                                    name: department.name,
                                    value: department.id,
                                    short: department.name
                                };
                            });
                            done(null, choices);
                        }
                    });   
                }
            }
        ])
        .then((answers) => {
            roleData.addRole(answers, (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    console.table(result);
                }
                onComplete();
            });
        })
}

module.exports = { viewAllRoles, addRolePrompt };