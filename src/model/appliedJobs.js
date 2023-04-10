const mongoose = require('mongoose')
const ObjectId = mongoose.Schema.Types.ObjectId

const appliedJob = new mongoose.Schema({

  jobId: {
    type: ObjectId,
    ref: 'job'
  },

  appliedUserId: {
    type: ObjectId,
    ref: 'Users'
  },

  applystatus: {
    type: String,
    enum: ["In-review", "Applied", "Rejected"],
    default: 'Applied'
  }

}, { timestamps: true })

module.exports = mongoose.model('apply', appliedJob);