const fs = require('fs');

const getDepartments = () => {
    const departmentsJson = fs.readFileSync('departments.json')
    return JSON.parse(departmentsJson);
}

const addDepartment = (departmant) => {
    const departmants = getDepartments();
    const newId = departmants.reduce((max, value) => {return Math.max(max, value.id)},0) + 1;
    console.log(newId);
    departmants.push({
        id: newId,
        name: departmant
    })

    fs.writeFileSync('departments.json', JSON.stringify(departmants));
}
module.exports = { getDepartments, addDepartment }