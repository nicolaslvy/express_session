const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}

const verification = (req,res)=>{
    res.sendStatus(200);
}

module.exports = {verification};