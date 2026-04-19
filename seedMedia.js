const dns = require("dns")
dns.setServers(["8.8.8.8", "1.1.1.1"])
require("dotenv").config()
const axios = require("axios")
const mongoose = require("mongoose")
const Media = require("./models/Media")
const { BASE_URL } = require("./globals")

const genreNames = {
  28: "Action",
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Sci-Fi",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
  10759: "Action & Adventure",
  10762: "Kids",
  10765: "Sci-Fi & Fantasy",
  10768: "War & Politics",
}

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
      description: m.overview || "No description available.",
      releaseDate: m.release_date ? new Date(m.release_date) : new Date(),
      mediaType: "movie",
      rating: m.vote_average,
      image: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
      genre: m.genre_ids.map((id) => genreNames[id]),
    }))

    const tvShows = tvRes.data.results.map((t) => ({
      title: t.name,
      description: t.overview || "No description available.",
      releaseDate: t.first_air_date ? new Date(t.first_air_date) : new Date(),
      mediaType: "tv",
      rating: t.vote_average,
      image: `https://image.tmdb.org/t/p/w500${t.poster_path}`,
      genre: t.genre_ids.map((id) => genreNames[id]),
    }))

    const allMedia = [...movies, ...tvShows]
    await Media.insertMany(allMedia)

    console.log("Seed successful! Your genres are now populated.")
    process.exit()
  } catch (error) {
    console.error("Seed failed:", error.message)
    process.exit(1)
  }
}

seedDB()
