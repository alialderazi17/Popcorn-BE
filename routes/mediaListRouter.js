const router = require('express').Router()
const mediaListController = require('../controllers/mediaListController')
const middleware = require('../middleware')

router.get('/:userId', mediaListController.getMediaListByUser)
router.post(
  '/',
  middleware.stripToken,
  middleware.verifyToken,
  mediaListController.createMediaList
)
router.put(
  '/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  mediaListController.updateMediaList
)
router.delete(
  '/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  mediaListController.deleteMediaList
)

module.exports = router
