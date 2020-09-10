const mongoose = require('mongoose')
const schema = mongoose.Schema
const bcrypt = require('bcrypt')
const { serviceSchema } = require('./serviceModel')

const userSchema = new schema({
  username: {
    type: String,
    required: true,
    lowercase: true,
    unique: true
  },
  password: {
    type: String,
    required: true
  },
  createDate: {
    type: Date,
    default: Date.now
  },
  status: {
    type: String,
    default: 'use'
  },
  services: {
    type: [serviceSchema],
    required: false
  }
})

userSchema.pre('save', async function (next) {
  try {
    const salt = await bcrypt.genSalt(10)
    const hashPassword = await bcrypt.hash(this.password, salt)
    this.password = hashPassword
  } catch (error) {
    next(error)
  }
})

userSchema.pre('findOneAndUpdate', async function (next) {
  try {
    if (this._update.password) {
      const salt = await bcrypt.genSalt(10);
      const hashPassword = await bcrypt.hash(this._update.password, salt);
      this._update.password = hashPassword;
    }
  } catch (error) {
    next(error)
  }
})

userSchema.methods.isValidPassword = async function (password) {
  try {
    console.log(password)
    console.log(this.password)
    return await bcrypt.compare(password, this.password)
  } catch (error) {
    throw error
  }
}

const user = mongoose.model('user', userSchema)
module.exports = user
