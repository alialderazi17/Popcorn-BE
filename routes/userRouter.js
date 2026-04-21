const router = require('express').Router()

const UserController = require('../controllers/userController')

router.get('/:id', UserController.showUserPage)

module.exports = router
