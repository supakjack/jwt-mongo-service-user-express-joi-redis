const { serviceModel } = require('./../models/serviceModel')

module.exports = {
  add: async (req, res, next) => {
    try {
      const result = req.body
      const service = new serviceModel(result)
      const savedService = await service.save()

      res.send({ savedService })
    } catch (error) {
      next(error)
    }
  }
}
