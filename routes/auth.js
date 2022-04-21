const express = require('express')
const router = express.Router()
const authController = require('../controllers/authController')

router.route('/').get(authController.verification)

module.exports = router