const express = require('express');
const router = express.Router();
const basicUserControllers = require('../../Controllers/userControllers/basicUserControllers');
const { checkPermission } = require('../../services/Authentication');

router.get('/hello' ,(req, res) => {
  
    res.status(201).json('hello')
})

router.post('/signup',basicUserControllers.createAccount); //create account

router.post('/login', basicUserControllers.loginAccount); //login

router.get('/logout', basicUserControllers.logoutAccount); //logout

router.get('/basic-details', basicUserControllers.getUserBasicDetails); //GetUserDetails

router.get('/saved-posts', basicUserControllers.getSavedPosts); //GetUserDetails

router.patch('/editaccount', basicUserControllers.editProfile); //edit account

router.patch('/editpropic', ()=>{}); //edit propic

router.patch('/changepassword', () => {});//change password

router.patch('/savead', () =>{})//save a ad


module.exports = router;