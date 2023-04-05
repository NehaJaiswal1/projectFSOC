const mongoose = require("mongoose");

const jobSchema = new mongoose.Schema({
    title: { //(up to 300 characters)
        type : String, 
        required: true
    },
    department: {
        type : String,
         required: true
    },
    salaryFrom : {
        type : Number, 
        required: true
    },
    salaryTo : {
        type : Number, 
        required: true
    },
    experience : {
        type : String, 
        required: true
    },
    jobDescription : { //(up to 3000 characters)
        type : String, 
        required: true
    },
    minimumQualification : {
        type : String,
         required: true
    },
    skillsRequired : {
        type : String, 
        required: true},
    company :{ //(up to 100 characters)
        type : String, 
        required: true},
    location :{
        type : String, 
        required: true}, // (any Indian city or remote)
    email : {
        type : String,
         required: true},
    phoneNumber : {
        type : String, 
        required: true},
     role: {
         type: String,
        enum:["Admin", "Job-seeker", "employeer"],
        required: true
    },
    
    appliedCandidates : {
        type : [] ,
         required: true},
    postedBy : {
        type : String, 
        required: true},
    tags: {
        type : [] , 
        required: true
    }
},{
    timestamps : true,
})

const jobModel = new mongoose.model('jobs' , jobSchema)
module.exports = jobModel