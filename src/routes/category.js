const router = require('express').Router()
const Category = require('../models/Category')
const verifyToken = require('./verifyToken')

router.post('/', verifyToken, async (req, res, next) => {
  try {
    const categories = await new Category().fetchAll({ require: false })
    if (!categories) {
      return res.status(400).json({
        success: false,
        message: 'Category not found',
      })
    }
    const data = categories.models
    res.json({ success: true, data })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
})

module.exports = router
