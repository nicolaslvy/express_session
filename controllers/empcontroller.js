
// const data = require('../data/data.json')
const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}

  




//exporting modules 

module.exports = {getAllEmployees};