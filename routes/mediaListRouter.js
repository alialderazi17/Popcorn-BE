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
router.post(
  '/:userId/',
  middleware.stripToken,
  middleware.verifyToken,
  mediaListController.addToMediaList
)
router.put(
  '/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  mediaListController.updateMediaList
)
router.delete(
  '/delete/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  mediaListController.deleteMediaList
)
router.delete(
  '/:userId',
  middleware.stripToken,
  middleware.verifyToken,
  mediaListController.removeFromMediaList
)

module.exports = router
