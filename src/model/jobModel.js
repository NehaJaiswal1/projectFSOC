const mongoose = require('mongoose');



const jobSchema = new mongoose.Schema({

    title: {
        type: String,
        trim: true,
        required: true,
        maxlength: 70,
    },

    description: {
        type: String,
        trim: true,
        required: true,
    },
    salary: {
        type: String,
        trim: true,
        required: true,
    },

    location: {
        type: String,
        required: true,
    },
    
    candidateApplied:{
        type: Boolean,
        default: false
    },

    isDeleted:{
        type: Boolean,
        default: false
    },
    
   tags:{
    type: [String],
    required: true
   }, //skills

   companyName:{
    type: String,
    required: true
   },

   createdDate: {
    type: Date,
    default: Date.now
},
  
}, { timestamps: true })

module.exports = mongoose.model("Job", jobSchema);