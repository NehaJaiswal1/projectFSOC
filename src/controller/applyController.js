
const appliedJob = require('../model/appliedJobs')
const userModel = require('../model/userModel')

const createApply = async function (req, res) {
    let userId = req.params.userId //userId
    if (!mongoose.isValidObjectId(userId))
      return res.status(400).send({ status: false, message: "Please provide valid userId" })

    let jobID = req.body.jobId
    if (!mongoose.isValidObjectId(jobID))
      return res.status(400).send({ status: false, message: "Please provide valid jobId" })

    data = req.body
    let { appliedUserId, jobId } = data
    if (Object.keys(data).length == 0)
    return res.status(400).send({ status: false, message: "Please send data" });

    appliedUserId = data.appliedUserId = userId
    jobId = data.jobId = jobID
    let create1 = await appliedJob.create(data)
    if(!create1){
        return res.status(400).send({ status: false, message: "no user applied applied for certain job position" })
    }
    let applycandidatedata = await userModel.findById(userId)
    if(!applycandidatedata){
        return res.status(404).send({ status: false, message: "No user found" })
    }
    let obj = {
        jobPosition: create1,
        candidate: applycandidatedata
    }
    return res.status(200).send({ status: true, data: obj })

}

const updateResume = async function (req, res) {
    let userId = req.params.userId
    let jobId = req.body.jobId
    let appliedUserId = req.body.userId
    let applystatus = req.body.applystatus

    if (!mongoose.isValidObjectId(jobId))
      return res.status(400).send({ status: false, message: "Please provide valid jobId" })

    let alreadyApplied = await appliedJob.findById({_id: appliedUserId})
    
    if (alreadyApplied) {
        if (alreadyApplied.applystatus == 'Applied' || alreadyApplied.applystatus == 'In-review' || alreadyApplied.applystatus == 'Rejected')
          return res.status(400).send({ status: false, message: "User  already applied" });
  
    }

    let employeeData = await userModel.findById(userId)
    if (employeeData.role == 'employer') {
        return res.status(403).send({ status: false, message: "Access denied" })
    }
    let updateData = await appliedJob.findOneAndUpdate({ jobId: jobId, userId: userId }, { $set: { applystatus: applystatus } }, { new: true })
    if(!updateData){
        return res.status(404).send({status: false, message: "No data to be updated"})
    }
    
    return res.status(200).send({ status: true, data: updateData })
}

module.exports = {
    createApply,
    updateResume
}