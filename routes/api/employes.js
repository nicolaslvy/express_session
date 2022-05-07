// import {getAllEmployees} from '../../controllers/empcontroller'



// express, path , router

const express = require('express')
const req = require('express/lib/request')
const router = express.Router()
const empcontroller = require('../../controllers/empcontroller')
const veryfyJWT = require('../../middleware/veryfyJwt')

router.route('/').get(veryfyJWT, empcontroller.getAllEmployees)


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