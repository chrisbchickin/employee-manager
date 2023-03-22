const inquirer = require('inquirer');
const empData = require('../data/employee-data')
const roleData = require('../data/roles-data');
// retreives employees through sequel
const viewAllEmployees = (onComplete) => {
    empData.getEmployees((error, employee) => {
        if (error) {
            console.log(error);
        } else {
            console.table(employee);
        }
        onComplete();
    });
}
//adds employee through sequel
const addEmployeePromt = (onComplete) => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'First name:',
                name: 'firstName',
            },
            {
                type: 'input',
                message: 'Last name:',
                name: 'lastName'
            },
            {
                type: 'list',
                message: 'What role?',
                name: 'roleId',
                // calls database for roles and maps to choices array
                choices: function (answers) {
                    const done = this.async();

                    roleData.getRoles((error, roles) => {
                        if (error) {
                            done(error);
                        } else {
                            const choices = roles.map((role) => {
                                return {
                                    name: role.title,
                                    value: role.id,
                                    short: role.title
                                }
                            })
                            done(null, choices);
                        }
                    })
                }
            },
            {
                type: 'list',
                message: 'Who is the employee\'s manager?',
                name: 'managerId',
                choices: function (answers) {
                    const done = this.async();

                    empData.getEmployees((error, employees) => {
                        if (error) {
                            done(error);
                        } else {
                            const choices = employees.map((employee) => {
                                return {
                                    name: `${employee.firstName} ${employee.lastName}`,
                                    value: employee.id,
                                    short: employee.firstName
                                }
                            });

                            done(null, [
                                {
                                    name: 'NONE',
                                    value: null,
                                },
                                ...choices
                            ]);
                        }
                    })
                }
            }
        ])
        .then((answers) => {
            empData.addEmployee(answers, (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result);
                }
                onComplete();
            });
        })
}
//  
const updateEmployeePromt = (onComplete) => {
    inquirer
        .prompt([
            {
                type: 'list',
                message: 'What employee would you like to change?',
                name: 'id',
                choices: function (answers) {
                    const done = this.async();

                    empData.getEmployees((error, employees) => {
                        if (error) {
                            done(error);
                        } else {
                            const choices = employees.map((employee) => {
                                return {
                                    name: `${employee.firstName} ${employee.lastName}`,
                                    value: employee.id,
                                    short: employee.firstName
                                }
                            });

                            done(null, choices);
                        }
                    })
                }
            },
            {
                type: 'list',
                message: 'What role do you want to assign the employee?',
                name: 'roleId',
                choices: function (answers) {
                    const done = this.async();

                    roleData.getRoles((error, roles) => {
                        if (error) {
                            done(error);
                        } else {
                            const choices = roles.map((role) => {
                                return {
                                    name: role.title,
                                    value: role.id,
                                    short: role.title
                                }
                            })
                            done(null, choices);
                        }
                    })
                }
            }
        ])
        .then((answers) => {
            empData.updateEmployee(answers, (error, result) => {
                if (error) {
                    console.log(error);
                } else {
                    console.log(result);
                }
                onComplete();
            });
        })
}

module.exports = { viewAllEmployees, addEmployeePromt, updateEmployeePromt };