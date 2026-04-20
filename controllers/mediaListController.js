const MediaList = require('../models/MediaList')
const Media = require('../models/Media')
const getMediaListByUser = async (req, res) => {
  try {
    const list = await MediaList.find({ user: req.params.userId }).populate(
      'items'
    )
    res.json(list)
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

const updateMediaList = async (req, res) => {
  try {
    const updatedList = await MediaList.findOneAndUpdate(
      { user: req.params.userId },
      req.body,
      { new: true }
    )
    res.json(updatedList)
  } catch (error) {
    res.status(400).json({ message: 'Error updating list' })
  }
}

const deleteMediaList = async (req, res) => {
  try {
    await MediaList.findOneAndDelete({ user: req.params.userId })
    res.json({ message: 'User media list deleted' })
  } catch (error) {
    res.status(500).json({ message: 'Error deleting list' })
  }
}

module.exports = {
  getMediaListByUser,
  createMediaList,
  updateMediaList,
  deleteMediaList,
}
