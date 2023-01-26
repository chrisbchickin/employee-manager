const fs = require('fs');

const getRoles = () => {
    const rolesJson = fs.readFileSync('roles.json')
    return JSON.parse(rolesJson);
}

const addRole = (role) => {
    const roles = getRoles();
    const newId = roles.reduce((max, value) => {return Math.max(max, value.id)},0) + 1;
    console.log(newId);
    roles.push({
        id: newId,
        name: role
    })

    fs.writeFileSync('roles.json', JSON.stringify(roles));
}
module.exports = { getRoles, addRole }