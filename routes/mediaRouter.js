const router = require('express').Router()
const MediaController = require('../controllers/mediaController')

router.get('/movies', MediaController.getMovies)

router.get('/movies/:id', MediaController.getMovieById)

router.get('/tv', MediaController.getTV)

router.get('/tv/:id', MediaController.getTVById)

module.exports = router
