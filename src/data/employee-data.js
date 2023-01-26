const fs = require('fs');

const getEmployee = () => {
    const employeeJson = fs.readFileSync('employee.json')
    return JSON.parse(employeeJson);
}

const addEmployee = (employee) => {
    const employees = getEmployee();
    const newId = employees.reduce((max, value) => {return Math.max(max, value.id)},0) + 1;
    console.log(newId);
    employees.push({
        id: newId,
        name: employee
    })

    fs.writeFileSync('employee.json', JSON.stringify(employees));
}
module.exports = { getEmployee, addEmployee }