
const jobModel = require('../model/jobModel')

// create job
const createjob = async function(req,res){
    try {
    let job = req.body;
    if(!job){
        return res.status(400).send({status: false, message: "Please provide job details"})
    }
    let save = await jobModel.create(job)
    return res.status(200).send({status: true, data: save})
    } catch (error) {
        return res.status(400).send({status: false, message: error.message})
    }
    
}

// for single job search
const singlejob = async function(req,res){
    try {
        let id = req.params.jobId
        const singlejobdata = await jobModel.findOne({_id: id, isDeleted: false})
        return res.status(200).send({status:true, data: singlejobdata})
    } catch (error) {
        return res.status(400).send({status: false, message: error.message})
    }
}

// update by id
const updateJob = async function(req,res){
    try {
        let id = req.params.jobId
        let {title} = req.body
        console.log(title)
        const finaldata = await jobModel.findOneAndUpdate({_id: id, isDeleted: false}, {$set: {title: title}},{new: true})
        return res.status(200).send({status: true, data: finaldata})
    } catch (error) {
        return res.status(400).send({status: false, message: error.message})
    }
}

// available: false
const deleteJob = async function(req,res){
    try {
        let id = req.params.jobId
        const deleteData = await jobModel.findByIdAndUpdate(id, {$set:{isDeleted: true}}, {new: true})
        return res.status(200).send({status: true, data: deleteData})
        
    } catch (error) {
        return res.status(400).send({status: false, message: error.message})
    }
}

module.exports = {createjob, singlejob, updateJob, deleteJob}