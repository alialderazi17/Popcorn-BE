const router = require('express').Router()
const MediaController = require('../controllers/mediaController')


router.get('/movies', MediaController.getMovies)

router.get('/tv', MediaController.getTV)

module.exports = router
