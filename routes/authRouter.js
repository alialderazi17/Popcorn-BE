const router = require('express').Router()
const authController = require('../controllers/authController')
const middleware = require('../middleware')

router.post('/register', authController.register)
router.post('/login', authController.login)
router.put(
  '/update-password/:id',
  middleware.stripToken,
  middleware.verifyToken,
  authController.updatePassword
)
router.get(
  '/session',
  middleware.stripToken,
  middleware.verifyToken,
  authController.checkSession
)

module.exports = router
