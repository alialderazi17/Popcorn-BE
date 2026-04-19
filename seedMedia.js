require("dotenv").config()
const axios = require("axios")
const mongoose = require("mongoose")
const Media = require("./models/Media")
const { BASE_URL } = require("./globals")

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log("Connected to Atlas via MONGODB_URI")

    await Media.deleteMany({})

    const apiKey = process.env.API_KEY_POPCORN

    const [movieRes, tvRes] = await Promise.all([
      axios.get(`${BASE_URL}/discover/movie`, { params: { api_key: apiKey } }),
      axios.get(`${BASE_URL}/discover/tv`, { params: { api_key: apiKey } }),
    ])

    const movies = movieRes.data.results.map((m) => ({
      title: m.title,
      description: m.overview,
      releaseDate: m.release_date ? new Date(m.release_date) : new Date(),
      mediaType: "movie",
      rating: m.vote_average,
      image: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
      genre: [],
    }))

    const tvShows = tvRes.data.results.map((t) => ({
      title: t.name,
      description: t.overview,
      releaseDate: t.first_air_date ? new Date(t.first_air_date) : new Date(),
      mediaType: "tv",
      rating: t.vote_average,
      image: `https://image.tmdb.org/t/p/w500${t.poster_path}`,
      genre: [],
    }))

    const allMedia = [...movies, ...tvShows]
    await Media.insertMany(allMedia)

    console.log("Seed successful!")
    process.exit()
  } catch (error) {
    console.error("Seed failed:", error.message)
    process.exit(1)
  }
}

seedDB()
