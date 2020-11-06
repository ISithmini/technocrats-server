const express = require('express');
const router = express.Router();
const basicUserControllers = require('../../Controllers/userControllers/basicUserControllers')


router.post('/signup', basicUserControllers.createAccount); //create account

router.post('/login', ()=>{}); //login

router.patch('/editaccount', ()=>{}); //edit account

router.patch('/editpropic', ()=>{}); //edit propic

router.patch('/changepassword', () => {});//change password

router.patch('/saveadd', () =>{})//save a ad

router.get('/savedads', ()=>{})//get saved ads


module.exports = router;