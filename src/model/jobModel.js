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


    tags: {
        type: [String],
        default: []
    }, //skills

    companyName: {
        type: String,
        required: true
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

}, { timestamps: true })

module.exports = mongoose.model("Job", jobSchema);