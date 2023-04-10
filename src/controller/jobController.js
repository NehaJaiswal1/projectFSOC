const mongoose = require('mongoose')
const jobModel = require('../model/jobModel')
const userModel = require('../model/userModel')
const applyModel = require('../model/appliedJobs')

// create job
const createjob = async function (req, res) {
    try {

        let job = req.body;
        let { title, description, salary, location, companyName, tags, createdBy } = job;

        if (Object.keys(job).length == 0)
            return res.status(400).send({ status: false, message: "please provide required fields" });

        if (!title)
            return res.status(400).send({ status: false, message: " title is mandatory" });

        if (typeof title != "string")
            return res.status(400).send({ status: false, message: " title should be in string" });

        title = job.title = title.trim();

        if (title == "")
            return res.status(400).send({ status: false, message: "Please Enter title value" });

        // if (!validation.validatetitle(title))
        //   return res.status(400).send({ status: false, message: "please provide valid title " });

        if (!description)
            return res.status(400).send({ status: false, message: " description is mandatory" });

        if (typeof description != "string")
            return res.status(400).send({ status: false, message: " description should be in string" });

        description = job.description = description.trim();

        if (description == "")
            return res.status(400).send({ status: false, message: "Please Enter description value" });

        if (!salary)
            return res.status(400).send({ status: false, message: " salary is mandatory" });

        if (typeof salary != "string")
            return res.status(400).send({ status: false, message: " salary should be in string" });

        salary = job.salary = salary.trim();

        if (salary == "")
            return res.status(400).send({ status: false, message: "Please Enter salary value" });

        if (!location)
            return res.status(400).send({ status: false, message: " location is mandatory" });

        if (typeof location != "string")
            return res.status(400).send({ status: false, message: " location should be in string" });

        location = job.location = location.trim();

        if (location == "")
            return res.status(400).send({ status: false, message: "Please Enter location value" });


        if (!tags)
            return res.status(400).send({ status: false, message: " tags is mandatory" });

        if (typeof tags != "string")
            return res.status(400).send({ status: false, message: " tags should be in string" });

        tags = job.tags = tags.trim();

        if (tags == "")
            return res.status(400).send({ status: false, message: "Please Enter tags value" });

        if (!companyName)
            return res.status(400).send({ status: false, message: " companyname is mandatory" });

        if (typeof companyName != "string")
            return res.status(400).send({ status: false, message: " companyname should be in string" });

        companyName = job.companyname = companyName.trim();

        if (companyName == "")
            return res.status(400).send({ status: false, message: "Please Enter companyName" });


        if (!createdBy)
            return res.status(400).send({ status: false, message: " createdBy is mandatory" });

        if (typeof createdBy != "string")
            return res.status(400).send({ status: false, message: " createdBy should be in string" });

        createdBy = job.createdBy = createdBy.trim();

        if (createdBy == "")
            return res.status(400).send({ status: false, message: "Please Enter createdBy value" });


        let save = await jobModel.create(job)
        return res.status(200).send({ status: true, data: save })
    } catch (error) {
        return res.status(400).send({ status: false, message: error.message })
    }

}

// for single job search
const singlejob = async function (req, res) {
    try {
        let id = req.params.jobId
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send({ status: false, message: "Please provide valid jobId" })

        const singlejobdata = await jobModel.findOne({ _id: id, isDeleted: false })
        if (!singlejobdata) {
            return res.status(404).send({ status: false, message: "no data found" })
        }

        return res.status(200).send({ status: true, data: singlejobdata })
    } catch (error) {
        return res.status(400).send({ status: false, message: error.message })
    }
}

// all jobs applied by job-seekers
const allJobs = async function (req, res) { // auth, autho
    try {
        let id = req.body.jobId
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send({ status: false, message: "Please provide valid jobId" })

        let foundAllResumes = await userModel.find({ _id: id, isDeleted: false })
        if (!foundAllResumes) {
            return res.status(404).send({ status: false, message: "no data found" })
        }
        return res.status(200).send({ status: true, data: foundAllResumes })
    } catch (error) {
        return res.status(400).send({ status: false, message: error.message })
    }
}

// all jobs by employer

const allJobsEmployer = async function (req, res) {
    try {
        let companyName = req.body
        // let userId = req.params.userId
        let checkCompany = await jobModel.find(companyName, {isDeleted:false})
        if (!checkCompany) {
            return res.status(404).send({ status: false, message: "Company doesn't exist" })
        }
        return res.status(200).send({status: true, data: checkCompany})

    } catch (error) {
        return res.status(400).send({ status: false, message: error.message })
    }
}

// all jobs applied by job-seeker

const allJobsSeeker = async function(req,res){
    try {
        let jobSeekerId = req.params.userId
        let dataApplied = await applyModel.find({appliedUserId: jobSeekerId}, {isDeleted:false})

        return res.status(200).send({status: true, data: dataApplied})
    } catch (error) {
        return res.status(400).send({ status: false, message: error.message })
    }
}


// update by id
const updateJob = async function (req, res) {
    try {
        let id = req.params.jobId
        let job = req.body
        let { title, description, salary, location, companyName, tags } = job
        if (title) {
            if (typeof title != "string")
                return res.status(400).send({ status: false, message: " title should be in string" });
            title = job.title = title.trim();
            if (title == "")
                return res.status(400).send({ status: false, message: "Please Enter title value" });

        }
        if (description) {
            if (typeof description != "string")
                return res.status(400).send({ status: false, message: " description should be in string" });
            description = job.description = description.trim();
            if (description == "")
                return res.status(400).send({ status: false, message: "Please Enter description value" });

        }
        if (salary) {
            if (typeof salary != "string")
                return res.status(400).send({ status: false, message: " salary should be in string" });
            salary = job.salary = salary.trim();
            if (salary == "")
                return res.status(400).send({ status: false, message: "Please Enter salary" });

        }

        if (location) {
            if (typeof location != "string")
                return res.status(400).send({ status: false, message: " location should be in string" });
            location = job.location = location.trim();
            if (location == "")
                return res.status(400).send({ status: false, message: "Please Enter location" });

        }

        if (tags) {
            if (typeof tags != "string")
                return res.status(400).send({ status: false, message: " tags should be in string" });
            tags = job.tags = tags.trim();
            if (tags == "")
                return res.status(400).send({ status: false, message: "Please Enter tags" });

        }

        if (companyName) {
            if (typeof companyName != "string")
                return res.status(400).send({ status: false, message: " companyName should be in string" });
            companyName = job.companyName = companyName.trim();
            if (companyName == "")
                return res.status(400).send({ status: false, message: "Please Enter companyName" });

        }
        const finaldata = await jobModel.findOneAndUpdate(
            { _id: id, isDeleted: false },
            {
                $set: {
                    title: title, description: description, salary: salary,
                    location: location, companyName: companyName, tags: tags
                }
            },
            { new: true })
        return res.status(200).send({ status: true, data: finaldata })
    } catch (error) {
        return res.status(400).send({ status: false, message: error.message })
    }
}

// deleted: false
const deleteJob = async function (req, res) {
    try {
        let id = req.params.jobId
        if (!mongoose.isValidObjectId(id))
            return res.status(400).send({ status: false, message: "Please provide valid jobId" })

        const deleteData = await jobModel.findByIdAndUpdate(id, { $set: { isDeleted: true } }, { new: true })
        if (!deleteData) {
            return res.status(404).send({ status: false, message: "No data found to be deleted" })
        }
        return res.status(200).send({ status: true, data: deleteData })

    } catch (error) {
        return res.status(400).send({ status: false, message: error.message })
    }
}

module.exports = { createjob, singlejob, updateJob, deleteJob, allJobs, allJobsEmployer, allJobsSeeker}