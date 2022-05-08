const express = require('express')
const router = express.Router()

const registerController = require('../controllers/registercontroller')


router.route('/').get(registerController.register) 


module.exports = router;