// import {getAllEmployees} from '../../controllers/empcontroller'



// express, path , router

const express = require('express')
const router = express.Router()
const empcontroller = require('../../controllers/empcontroller')
// const veryfyJWT = require('../../middleware/veryfyJwt')
const verifyRoles = require('../../middleware/verifyRoles')
const ROLES_LIST = require('../../roles/roles_list')








router.route('/').get(
    verifyRoles(ROLES_LIST.Admin),

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