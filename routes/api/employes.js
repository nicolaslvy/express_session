// import {getAllEmployees} from '../../controllers/empcontroller'



// express, path , router

const express = require('express')
const path = require('path')
const router = express.Router()
const data = {}
const empcontroller = require('../../controllers/empcontroller') 
router.route('/').get(empcontroller.getAllEmployees)


// ).post(
//     (req,res)=>{
    
//     }
// )
// .put(
//     (req,res)=>{
    
//     }
// ).delete(
//     (req,res)=>{
    
//     }
// )
// router.route('/:id').get(
// (req,res)=>{
//     res.json({'id': req.params.id})
// }
// )




module.exports = router