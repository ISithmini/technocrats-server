const express = require('express');
const router = express.Router();
const basicUserControllers = require('../../Controllers/userControllers/basicUserControllers');
const { createJwt, checkPermission } = require('../../services/Authentication');

router.get('/hello', checkPermission('user', 'verifyUser') ,(req, res) => {
  
    res.status(201).json('hello')
})

router.post('/signup', basicUserControllers.createAccount); //create account

router.post('/login', ()=>{}); //login

router.patch('/editaccount', ()=>{}); //edit account

router.patch('/editpropic', ()=>{}); //edit propic

router.patch('/changepassword', () => {});//change password

router.patch('/saveadd', () =>{})//save a ad

router.get('/savedads', ()=>{})//get saved ads


module.exports = router;