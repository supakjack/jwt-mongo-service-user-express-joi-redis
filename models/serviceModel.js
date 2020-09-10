const mongoose = require('mongoose')
const schema = mongoose.Schema

const serviceSchema = new schema({
  name: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    required: true
  }
})

const serviceModel = mongoose.model('service', serviceSchema)
module.exports = {
  serviceModel,
  serviceSchema
}
