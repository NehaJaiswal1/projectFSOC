
const { application } = require('express')
const appliedJob = require('../model/appliedJobs')
const userModel = require('../model/userModel')

const createApply = async function(req, res){
    let userId = req.params.userId //userId
    let jobID = req.body.jobId
    data = req.body
    let {appliedUserId, jobId} = data
    appliedUserId = data.appliedUserId = userId
    jobId = data.jobId = jobID
    let create1 = await appliedJob.create(data)
    let applycandidatedata = await userModel.findById(userId)
    let obj = {
        jobPosition: create1,        
        candidate: applycandidatedata
    }
    return res.status(200).send({status: true, data: obj}) 

}

const updateResume = async function(req, res){
    let userId = req.params.userId
    let jobId = req.body.jobId
    let appliedUserId = req.body.userId
    let applystatus = req.body.applystatus

    let employeeData = await userModel.findById(userId)
    console.log(employeeData.role)
    if(employeeData.role != 'employer'){
        return res.status(403).send({status: false, message: "Access denied"})
    }
    // let userJob = await jobIdModel.findById()
    let updateData = await appliedJob.findOneAndUpdate({jobId: jobId, userId: userId},{$set:{applystatus: applystatus}},{new: true})
    return res.status(200).send({status: true, data : updateData})
}

module.exports = {
    createApply,
    updateResume
}