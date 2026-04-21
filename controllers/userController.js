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

module.exports = {
  showUserPage,
}
