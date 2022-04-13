// import {getAllEmployees} from '../../controllers/empcontroller'



// express, path , router

const express = require('express')
const router = express.Router()
const empcontroller = require('../../controllers/empcontroller')
router.route('/').get(empcontroller.getAllEmployees)


router.route('/').get(
    empcontroller.getAllEmployees
    ).post(
    empcontroller.createNewEmployee

)
    .put(
        empcontroller.updateEmployee
    ).delete(
        empcontroller.deleteEmployee
    )
router.route('/:id').get(
    empcontroller.getEmployee
)




module.exports = router