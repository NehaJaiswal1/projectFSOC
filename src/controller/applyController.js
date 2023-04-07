
const category = require('../model/jobCategory')

// create category
const createCategory = async function(req, res){
    try {
        let tags = req.body
        const tagData = await category.create(tags)
        return res.status(201).send({status: true, data: tagData})
    } catch (error) {
        return res.status(400).send({status:false, message: error.message})
    }
}


// get all category
const getAllCategory = async function(req,res){
    try {
        
        const getAllData = await category.find()
        return res.status(200).send({status:true, data: getAllData})
    } catch (error) {
        return res.status(400).send({status: false, message: error.message})
    }
}


module.exports = {createCategory, getAllCategory}