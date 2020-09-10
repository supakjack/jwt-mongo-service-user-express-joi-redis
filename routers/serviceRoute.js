const express = require('express')
const router = express.Router()
const serviceController = require('./../controllers/serviceController')

router.post('/', serviceController.add)

module.exports = router
