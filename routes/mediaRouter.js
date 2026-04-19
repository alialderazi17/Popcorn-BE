const router = require('express').Router()
const MediaController = require('../controllers/MediaController')


router.get('/movies', getMovies)

router.get('/tv',getTV)

module.exports = router
