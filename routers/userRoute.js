const express = require('express')
const router = express.Router()
const userController = require('./../controllers/userController')

router.post('/', userController.add)
router.put('/:username', userController.edit)
router.get('/:username', userController.get)
router.get('/', userController.get)

module.exports = router
