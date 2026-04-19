require("dotenv").config()
const axios = require("axios")
const mongoose = require("mongoose")
const Media = require("./models/Media")
const { BASE_URL } = require("./globals")

const connectionString = "mongodb://127.0.0.1:27017/popcornDatabase"

const seedDB = async () => {
  try {
    await mongoose.connect(connectionString)

    await Media.deleteMany({})

    const apiKey = process.env.API_KEY_POPCORN

    const [movieRes, tvRes] = await Promise.all([
      axios.get(`${BASE_URL}/discover/movie`, { params: { api_key: apiKey } }),
      axios.get(`${BASE_URL}/discover/tv`, { params: { api_key: apiKey } }),
    ])

    const movies = movieRes.data.results.map((m) => ({
      title: m.title,
      description: m.overview,
      releaseDate: new Date(m.release_date),
      mediaType: "movie",
      rating: m.vote_average,
      image: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
      genre: [],
    }))

    const tvShows = tvRes.data.results.map((t) => ({
      title: t.name,
      description: t.overview,
      releaseDate: new Date(t.first_air_date),
      mediaType: "tv",
      rating: t.vote_average,
      image: `https://image.tmdb.org/t/p/w500${t.poster_path}`,
      genre: [],
    }))

    const allMedia = [...movies, ...tvShows]
    await Media.insertMany(allMedia)

    process.exit()
  } catch (error) {
    process.exit(1)
  }
}

seedDB()
