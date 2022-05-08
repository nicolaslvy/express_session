const express = require('express') //llamando a express
const router = express.Router() ;// router

//Cntrolador

const refreshController = require('../controllers/refreshController');

router.route('/').get(refreshController.handleRefresh)

module.exports = router