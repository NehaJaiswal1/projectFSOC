

const express = require('express');
const router = express.Router();
const {createjob, singlejob, updateJob, deleteJob} = require("../controller/jobController")
const {register,loginUser,UpdateUser, getUser, forgetPassword, resetPassword, deleteUser} = require('../controller/userController')
const {authentication, authorization} = require('../middleware/auth')

// user

router.post('/user/register', register);
router.post('/user/login',loginUser);
router.get('/user/:userId', authentication, getUser);
router.put('/user/:userId', authentication,authorization,UpdateUser);
router.get('/user/password/:userId', forgetPassword);
router.put('/user/resetPassword', resetPassword);
router.delete('/user/:userId',  authentication,authorization, deleteUser);

// jobs

router.post('/job/create', createjob);
router.get('/job/:jobId', singlejob);
router.put('/job/update/:jobId', updateJob);
router.delete('/job/delete/:jobId', deleteJob)

module.exports = router 