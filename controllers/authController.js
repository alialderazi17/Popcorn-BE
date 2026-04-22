const User = require("../models/User")
const middleware = require("../middleware")

const register = async (req, res) => {
  try {
    const { username, email, password } = req.body
    let passwordDigest = await middleware.hashPassword(password)
    let existingUser = await User.exists({ email })

    if (existingUser) {
      return res.status(400).send("A user with this email already exists.")
    } else {
      const user = await User.create({ username, email, passwordDigest })
      res.send(user)
    }
  } catch (error) {
    console.error(error)
    return res.status(401).send({
      status: "Error",
      msg: "An error has occurred while registering this user!",
    })
  }
}

const login = async (req, res) => {
  try {
    const { email, password } = req.body
    const user = await User.findOne({ email })
    let matched = await middleware.comparePassword(
      password,
      user.passwordDigest
    )
    if (matched) {
      let payload = {
        id: user._id,
        email: user.email,
        username: user.username,
      }
      let token = middleware.createToken(payload)
      let userData = {
        id: user._id,
        email: user.email,
        username: user.username,
      }
      return res.send({ user: userData, token })
    } else {
      return res.status(401).send({
        status: "Error",
        msg: "Incorrect password!",
      })
    }
  } catch (error) {
    return res.status(401).send({
      status: "Error",
      msg: "An error has occurred while logging in!",
    })
  }
}

const updatePassword = async (req, res) => {
  try {
    const { oldPassword, newPassword } = req.body
    let user = await User.findById(req.params.id)
    let matched = await middleware.comparePassword(
      oldPassword,
      user.passwordDigest
    )
    if (matched) {
      let passwordDigest = await middleware.hashPassword(newPassword)
      user = await User.findByIdAndUpdate(req.params.id, {
        passwordDigest,
      })
      let payload = {
        id: user._id,
        email: user.email,
        username: user.username,
      }
      return res
        .status(200)
        .send({ status: "Password updated!", user: payload })
    } else {
      return res.status(401).send({
        status: "Error",
        msg: "Incorrect password!",
      })
    }
  } catch (error) {
    return res.status(401).send({
      status: "Error",
      msg: "An error has occurred while updating the password!",
    })
  }
}

const updateProfilePic = async (req, res) => {
  try {
    const { profilePic } = req.body
    const { id } = req.params

    const user = await User.findByIdAndUpdate(id, { profilePic }, { new: true })

    if (!user) {
      return res.status(404).send({ status: "Error", msg: "User not found!" })
    }
    res
      .status(200)
      .send({
        status: "Successfully updated PFP!",
        profilePic: user.profilePic,
      })
  } catch (error) {
    res.status(500).send({ status: "Error Updating PFP!", msg: error.message })
  }
}

const checkSession = async (req, res) => {
  const { payload } = res.locals
  res.status(200).send(payload)
}

module.exports = {
  register,
  login,
  updatePassword,
  updateProfilePic,
  checkSession,
}
