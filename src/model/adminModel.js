const mongoose = require('mongoose')

const adminModel = new mongoose.Schema({
  name: {
    type: String, 
    required: true
},
  role: {
    type: String,
    enum:["Admin", "Job-seeker", "employeer"],
    required: true
},
  email: {
    type: String,
     required: true
    },
  password: {
    type: String ,
     reuired:  true
    },
  createdAt: {timestamp},
  updatedAt: {timestamp}
})


module.exports = mongoose.model('admin', adminModel)