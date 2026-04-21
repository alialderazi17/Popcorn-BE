const User = require('../models/User')

const showUserPage = async (req, res) => {
  try {
    const user = await User.findById(req.params.id)
    if (!user) {
      return res.status(404).send({ message: 'User not found!' })
    }
    res.status(200).send(user)
  } catch (error) {
    console.error(error)
    return res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred trying to get this user!',
    })
  }
}

const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({})

    res.status(200).send(users)
  } catch (error) {
    console.error(error)
    return res.status(401).send({
      status: 'Error',
      msg: 'An error has occurred trying to get all users!',
    })
  }
}

module.exports = {
  showUserPage,
  getAllUsers,
}
