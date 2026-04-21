const router = require("express").Router()
const mediaListController = require("../controllers/mediaListController")
const middleware = require("../middleware")

router.get("/:userId", mediaListController.getMediaListByUser)

router.post(
  "/:userId",
  middleware.stripToken,
  middleware.verifyToken,
  mediaListController.addToMediaList
)

router.put(
  "/:userId",
  middleware.stripToken,
  middleware.verifyToken,
  mediaListController.updateMediaList
)

router.delete(
  "/:userId",
  middleware.stripToken,
  middleware.verifyToken,
  mediaListController.removeFromMediaList
)

router.post(
  "/",
  middleware.stripToken,
  middleware.verifyToken,
  mediaListController.createMediaList
)

module.exports = router
