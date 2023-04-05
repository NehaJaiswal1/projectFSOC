
const express = require('express')
const jobModel = require('../model/jobModel')
const route = express.Router()


route.get("/getalljobs", async(req, res)=>{
    try {
        const jobs = await jobModel.find()
        res.status(200).send({status: true, data: jobs})
    } 
    catch (error) {
        return res.status(400).send({status: false, message: error })
    }
})




module.exports = route

