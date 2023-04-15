

const express = require('express');
const router = express.Router();
const { createjob, singlejob, updateJob, deleteJob, allJobs, allJobsEmployer, allJobsSeeker } = require("../controller/jobController")
const { register, loginUser, UpdateUser, getUser, forgetpassword, resetPassword, deleteUser } = require('../controller/userController')
const { authentication, authorization } = require('../middleware/auth')
const { createApply, updateResume } = require('../controller/applyController')
const{awsLink, awsUpdate} = require('../middleware/awsLink')

// user

router.post('/register', awsLink, register);
router.post('/login', loginUser);
router.get('/user/:userId', authentication, getUser);
router.put('/user/:userId', authentication, authorization,awsUpdate,UpdateUser);
router.post('/forgetpassword', forgetpassword);
router.put('/resetPassword', resetPassword);
router.delete('/user/:userId', authentication, authorization, deleteUser);

// jobs

router.post('/job/create/:userId', authentication, authorization, createjob);
router.get('/job/:jobId', singlejob);
router.put('/job/update/:jobId',authentication, authorization, updateJob);
router.delete('/job/delete/:jobId',authentication, authorization, deleteJob)
router.get('/job/all/:userId',authentication, authorization, allJobs)
router.get('/job/alljobs/:userId',authentication, authorization, allJobsEmployer)
router.get('/job/alljobsapplied/:userId',authentication, authorization, allJobsSeeker)

// applied jobs

router.post('/job/:userId', authentication, authorization, createApply)
router.put('/resumeshortlisting/:userId', authentication, authorization, updateResume)

router.all('*/', function(req, res){
    return res.status(400).send({status:false, message:"Invalid Path"})
})

module.exports = router 