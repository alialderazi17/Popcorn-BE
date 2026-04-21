const dns = require('dns')
dns.setServers(['8.8.8.8', '1.1.1.1'])
require('dotenv').config()
const axios = require('axios')
const mongoose = require('mongoose')
const Media = require('./models/Media')
const { BASE_URL } = require('./globals')
const Genre = require('./models/Genre')

const genresData = require('./genres.json')

const fetchFromTMDB = async (type, totalPages, apiKey, genreLookup) => {
  let results = []
  const endpoint = type === 'movie' ? 'movie' : 'tv'

  for (let page = 1; page <= totalPages; page++) {
    console.log(`Fetching ${type} - Page ${page}...`)
    try {
      const res = await axios.get(`${BASE_URL}/discover/${endpoint}`, {
        params: {
          api_key: apiKey,
          page: page,
          language: 'en-US',
          sort_by: 'popularity.desc',
        },
      })

      const formatted = res.data.results.map((m) => ({
        title: m.title || m.name,
        description: m.overview || 'No description available.',
        releaseDate:
          m.release_date || m.first_air_date
            ? new Date(m.release_date || m.first_air_date)
            : new Date(),
        mediaType: type,
        rating: m.vote_average,
        image: `https://image.tmdb.org/t/p/w500${m.poster_path}`,
        genre: m.genre_ids
          .map((id) => genreLookup[id])
          .filter((id) => id != null),
      }))

      results.push(...formatted)
    } catch (err) {
      console.error(`Error on ${type} page ${page}:`, err.message)
    }
  }
  return results
}

const seedDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI)
    console.log('Connected to MongoDB.')

    console.log('Syncing Genres...')
    const genreLookup = {}

    // 1. Clear existing media links in Genre documents to prevent broken references
    await Genre.updateMany({}, { $set: { media: [] } })

    for (const g of genresData) {
      const doc = await Genre.findOneAndUpdate(
        { name: g.name },
        {
          description: g.description,
          image: g.image || null,
        },
        { upsert: true, new: true }
      )
      genreLookup[g.tmdbId] = doc._id
    }

    await Media.deleteMany({})
    console.log('Cleared old media.')

    const apiKey = process.env.API_KEY_POPCORN
    const PAGES_TO_FETCH = 5

    const [movies, tvShows] = await Promise.all([
      fetchFromTMDB('movie', PAGES_TO_FETCH, apiKey, genreLookup),
      fetchFromTMDB('tv', PAGES_TO_FETCH, apiKey, genreLookup),
    ])

    const allMedia = [...movies, ...tvShows]

    if (allMedia.length > 0) {
      // 2. Insert Media and store the returned documents (which now have _ids)
      const seededMedia = await Media.insertMany(allMedia)
      console.log(`Successfully seeded ${seededMedia.length} items!`)

      console.log('Linking Media to Genres...')

      // 3. Reverse Link: For every seeded Media, update the corresponding Genre documents
      for (const item of seededMedia) {
        if (item.genre && item.genre.length > 0) {
          await Genre.updateMany(
            { _id: { $in: item.genre } },
            { $push: { media: item._id } }
          )
        }
      }
      console.log('Two-way relationship established.')
    }

    console.log('Seeding process complete.')
    process.exit(0)
  } catch (error) {
    console.error('Seed failed:', error.message)
    process.exit(1)
  }
}

seedDB()
