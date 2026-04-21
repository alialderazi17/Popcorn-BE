const Genre = require('../models/Genre')

const getAllGenres = async (req, res) => {
  try {
    const genres = await Genre.find({})
    res.status(200).send(genres)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching genres' })
  }
}

const getGenreById = async (req, res) => {
  try {
    const genre = await Genre.findById(req.params.id).populate('media')
    if (!genre) return res.status(404).json({ message: 'Genre not found' })
    res.status(200).send(genre)
  } catch (error) {
    res.status(500).json({ message: 'Error fetching genre' })
  }
}

const createGenre = async (req, res) => {
  try {
    const newGenre = await Genre.create(req.body)
    res.status(201).send(newGenre)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating genre', error: error.message })
  }
}

module.exports = {
  getAllGenres,
  getGenreById,
  createGenre,
}
