const _ = require('lodash')
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
    const newData = _.map(data, (category) => {
      const prod = category.attributes
      prod.category_image_file = `${process.env.ASSET_URL}${prod.category_image_file}`
      return prod
    })
    res.json({ success: true, data: newData })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
})

module.exports = router
