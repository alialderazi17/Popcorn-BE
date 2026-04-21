const router = require('express').Router()

const UserController = require('../controllers/userController')

router.get('/', UserController.getAllUsers)
router.get('/:id', UserController.showUserPage)

module.exports = router
