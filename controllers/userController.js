const createError = require('http-errors')
const userModel = require('./../models/userModel')

module.exports = {
  get: async (req, res, next) => {
    try {
      const username = req.params.username
      const findUser = await userModel.find(username ? { username } : {})
      res.send({ findUser })
    } catch (error) {
      next(error)
    }
  },
  add: async (req, res, next) => {
    try {
      const result = req.body

      const doesExist = await userModel.findOne({ username: result.username })
      if (doesExist)
        throw createError.Conflict(
          `${result.username} is already been register`
        )
      console.log(result)
      const user = new userModel(result)
      const savedUser = await user.save()

      res.send({ savedUser })
    } catch (error) {
      next(error)
    }
  },
  edit: async (req, res, next) => {
    try {
      const result = req.body
      const username = req.params.username
      const editUser = await userModel.findOneAndUpdate({ username }, result)

      res.send({ editUser })
    } catch (error) {
      next(error)
    }
  }
}
