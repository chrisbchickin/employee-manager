const inquirer = require('inquirer');
const roleData = require('../data/roles-data')

const viewAllRoles = (onComplete) => {
    const roles = roleData.getRoles();
    console.table(roles);
    onComplete();
}

const addRolePrompt = (onComplete) => {
    inquirer
        .prompt([
            {
                type: 'input',
                message: 'What is the role name?',
                name: 'role',
              },
              {
                type: 'input',
                message: 'What is not the role name?',
                name: 'notrole',
              },
        ])
        .then((answers) => {
            roleData.addRole(answers.role);
            console.log(answers);
            onComplete();
        })
}

module.exports = { viewAllRoles, addRolePrompt };