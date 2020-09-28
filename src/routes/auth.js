const router = require('express').Router()
const User = require('../models/User')
const Joi = require('joi')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const verifyToken = require('./verifyToken')

// Validation
const schema = Joi.object({
  fullname: Joi.string().min(6),
  email: Joi.string().email().required(),
  avatar: Joi.string(),
  password: Joi.string().min(6).required(),
})

const schemaLogin = Joi.object({
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
})

router.post('/register', async (req, res) => {
  try {
    const { fullname, email, password } = req.body
    const { error } = schema.validate(req.body)
    if (error) {
      return res.status(400).json({
        success: false,
        message: error.details[0].message,
      })
    }

    // Check if user exist
    const userExist = await new User({ email: email }).fetch({ require: false })
    if (userExist) {
      return res.status(400).json({
        success: false,
        message: 'Email already exists',
      })
    }

    // Hash password
    const salt = await bcrypt.genSalt(10)
    const hashedPassword = await bcrypt.hash(password, salt)

    const user = await new User({
      fullname: fullname,
      email: email,
      password: hashedPassword,
    }).save()
    res.json({ id: user.id })
  } catch (error) {
    console.log('error', error)
    res.status(400).json({
      success: false,
      message: error,
    })
  }
})

router.post('/login', async (req, res) => {
  const { email, password } = req.body
  const { error } = schemaLogin.validate(req.body)
  if (error) {
    return res.status(400).json({
      success: false,
      message: error.details[0].message,
    })
  }

  // Check if user exist
  const userExist = await new User({ email: email }).fetch({ require: false })
  if (!userExist) {
    return res.status(400).json({
      success: false,
      message: 'Email is not found',
    })
  }

  const isValidPassword = await bcrypt.compare(password, userExist.get('password'))
  if (!isValidPassword) {
    return res.status(400).json({
      success: false,
      message: 'Oops! Your Password Is Not Correct',
    })
  }

  // Create and assign a token
  const token = jwt.sign({ id: userExist.get('id') }, process.env.TOKEN_SECRET)

  res.json({ success: true, token })
})

router.post('/profile', verifyToken, async (req, res, next) => {
  try {
    const user = await new User({ id: req.user.id }).fetch({ require: false })
    if (!user) {
      return res.status(400).json({
        success: false,
        message: 'User not found',
      })
    }
    user.set('password', '')
    res.json({ ...user.attributes })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
})
module.exports = router
