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

Status:{
  type: String,
  default: 'Applied',
  enum: ['In-review', 'Applied', 'Rejected']
} 

},{timestamps: true})

module.exports = mongoose.model('apply', appliedJob);