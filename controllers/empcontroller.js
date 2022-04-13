
// const data = require('../data/data.json')
const data = {
    employees: require('../model/employees.json'),
    setEmployees: function (data) { this.employees = data }
}

const getAllEmployees = (req, res) => {
    res.json(data.employees);
}



const createNewEmployee = (req, res)=>{
    const newEmp = {
        id: data.employees?.length ? data.employees[data.employees.length - 1].id + 1: 1,
        name: req.body.name,
        lastname: req.body.lastname

    }
    if(!newEmp.name || !newEmp.lastname ){
        return res.status(400).json({'message': 'fill in all the fields'})
    }

    data.setEmployees([...data.employees, newEmp]);
    res.status(201).json({'message': 'new emp added'})

}
//ruta para actualizar emp
const updateEmployee = (req, res)=>{
    const employee = data.employees.find(emp => emp.id === parseInt(req.body.id))
    if(!employee) return res.status(400).json({'message': 'emp not found'});

    if (req.body.name){ employee.name = req.body.name};
    if (req.body.lastname) {employee.lastname = req.body.lastname};
    
    const filteredArray = data.employees.filter(e=> e.id !== parseInt(req.body.id))
    const newArr = [...filteredArray, employee].sort((a, b) => a.id > b.id ? 1 : a.id < b.id ? -1 : 0)

    data.setEmployees(newArr)
    res.json(data.employees)


}

  

const deleteEmployee = (req,res)=>{

    const employee = data.employees.find(e=> e.id === parseInt(req.body.id))

    if(!employee){return res.status(400).json({'message':'employee not found'})};

    const filteredArray = data.employees.filter(e => e.id !== parseInt(req.body.id))
    data.setEmployees(filteredArray);
    res.json(data.employees)



}
const getEmployee = (req,res)=>{
    let emp = data.employees.find(e=>e.id === parseInt(req.params.id))
    if(!emp) {return res.json({'message': 'employee not found'})};
    res.json(emp) 
}

//exporting modules 

module.exports = {
    getAllEmployees,
    createNewEmployee,
    updateEmployee,
    deleteEmployee,
    getEmployee
}