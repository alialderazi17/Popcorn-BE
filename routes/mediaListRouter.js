const router = require("express").Router()
const mediaListController = require("../controllers/mediaListController")

router.get("/:userId", mediaListController.getMediaListByUser)
router.post("/", mediaListController.createMediaList)
router.put("/:userId", mediaListController.updateMediaList)
router.delete("/:userId", mediaListController.deleteMediaList)

module.exports = router
