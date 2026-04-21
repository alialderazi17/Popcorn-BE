const Media = require('../models/Media')
const Genre = require('../models/Genre')
const getMovies = async (req, res) => {
  try {
    const movies = await Media.find({ mediaType: 'movie' }).populate('genre')

    res.status(200).send(movies)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching movies')
  }
}

const getMovieById = async (req, res) => {
  try {
    const movie = await Media.findById(req.params.id).populate('genre')

    if (!movie) {
      return res.status(404).json({ message: 'Movie not found!' })
    }

    res.status(200).send(movie)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error getting movie')
  }
}

const getTV = async (req, res) => {
  try {
    const tvShows = await Media.find({ mediaType: 'tv' }).populate('genre')

    res.status(200).send(tvShows)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching TV shows')
  }
}

const getTVById = async (req, res) => {
  try {
    const tvShow = await Media.findById(req.params.id).populate('genre')
    if (!tvShow) {
      return res.status(404).json({ message: 'Tv Show not found!' })
    }
    res.status(200).send(tvShow)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error getting TV show')
  }
}
module.exports = { getMovies, getMovieById, getTV, getTVById }
