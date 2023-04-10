

const express = require('express');
const router = express.Router();
const { createjob, singlejob, updateJob, deleteJob, allJobs } = require("../controller/jobController")
const { register, loginUser, UpdateUser, getUser, forgetPassword, resetPassword, deleteUser } = require('../controller/userController')
const { authentication, authorization } = require('../middleware/auth')
const { createApply, updateResume } = require('../controller/applyController')
const{awsLink, awsUpdate} = require('../middleware/awsLink')

// user

router.post('/user/register', awsLink, register);
router.post('/user/login', loginUser);
router.get('/user/:userId', authentication, getUser);
router.put('/user/:userId', authentication, authorization, awsUpdate,  UpdateUser);
router.get('/user/password/:userId', authentication, authorization, forgetPassword);
router.put('/user/resetPassword', authentication, authorization, resetPassword);
router.delete('/user/:userId', authentication, authorization, deleteUser);

// jobs

router.post('/job/create', authentication, authorization, createjob);
router.get('/job/:jobId', singlejob);
router.put('/job/update/:jobId', updateJob);
router.delete('/job/delete/:jobId', deleteJob)
router.get('/job/all/:userId', allJobs)

// applied jobs

router.post('/job/:userId', authentication, authorization, createApply)
router.put('/resumeshortlisting/:userId', authentication, authorization, updateResume)

module.exports = router 