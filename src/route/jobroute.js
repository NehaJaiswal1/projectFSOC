

const express = require('express');
const router = express.Router();
const {createjob, singlejob, updateJob, deleteJob} = require("../controller/jobController")

router.post('/job/create', createjob);
router.get('/job/:jobId', singlejob);
router.put('/job/update/:jobId', updateJob);
router.delete('/job/delete/:jobId', deleteJob)

module.exports = router