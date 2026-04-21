const mongoose = require('mongoose')
const MediaList = require('../models/MediaList')
const Media = require('../models/Media')
const Genre = require('../models/Genre')

const getMediaListByUser = async (req, res) => {
  try {
    const list = await MediaList.findOne({ user: req.params.userId })
      .populate('user', 'username')
      .populate({
        path: 'items.media',
        populate: { path: 'genre' },
      })

    if (!list) return res.status(200).send({ items: [] })
    res.status(200).send(list)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Error fetching user media list' })
  }
}

const createMediaList = async (req, res) => {
  try {
    const newList = await MediaList.create(req.body)
    res.status(201).json(newList)
  } catch (error) {
    res
      .status(400)
      .json({ message: 'Error creating list', error: error.message })
  }
}

const addToMediaList = async (req, res) => {
  try {
    const { userId } = req.params
    const { media, status, userRating, description } = req.body

    const listExists = await MediaList.findOne({
      user: userId,
      'items.media': media,
    })

    if (listExists) {
      return res.status(400).json({ message: 'Item already in list' })
    }

    const updatedList = await MediaList.findOneAndUpdate(
      { user: userId },
      {
        $push: {
          items: {
            media,
            status: status || 'plan to watch',
            userRating: userRating,
            description: description,
          },
        },
      },
      { new: true, upsert: true }
    ).populate({
      path: 'items.media',
      populate: { path: 'genre' },
    })

    res.status(200).send(updatedList)
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: 'Error adding item', error: error.message })
  }
}

const updateMediaList = async (req, res) => {
  try {
    const updatedList = await MediaList.findOneAndUpdate(
      { user: req.params.userId },
      req.body,
      { new: true }
    )
    res.status(200).send(updatedList)
  } catch (error) {
    res.status(400).json({ message: 'Error updating list' })
  }
}

const removeFromMediaList = async (req, res) => {
  try {
    const { userId } = req.params
    const { media } = req.body

    const updatedList = await MediaList.findOneAndUpdate(
      { user: userId },
      { $pull: { items: { media: media } } },
      { new: true }
    ).populate({
      path: 'items.media',
      populate: { path: 'genre' },
    })

    if (!updatedList) {
      return res.status(404).json({ message: 'List not found' })
    }

    res.status(200).send(updatedList)
  } catch (error) {
    console.error(error)
    res.status(400).json({ message: 'Error removing item from list' })
  }
}

const deleteMediaList = async (req, res) => {
  try {
    await MediaList.findOneAndDelete({ user: req.params.userId })
    res.status(200).json({ message: 'User media list deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting list' })
  }
}

module.exports = {
  getMediaListByUser,
  createMediaList,
  addToMediaList,
  updateMediaList,
  removeFromMediaList,
  deleteMediaList,
}
