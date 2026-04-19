const axios = require('axios')
const { BASE_URL } = require('../globals')

const getMovies = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/movie`, {
      params: {
        api_key: process.env.API_KEY_POPCORN
      }
    })

    res.json(response.data.results)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching movies')
  }
}

const getTV = async (req, res) => {
  try {
    const response = await axios.get(`${BASE_URL}/discover/tv`, {
      params: {
        api_key: process.env.API_KEY_POPCORN
      }
    })

    res.json(response.data.results)
  } catch (error) {
    console.error(error)
    res.status(500).send('Error fetching TV shows')
  }
}

module.exports = { getMovies, getTV }
