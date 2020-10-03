const router = require('express').Router()
const Product = require('../models/Product')
const verifyToken = require('./verifyToken')

router.post('/', verifyToken, async (req, res, next) => {
  try {
    const products = await new Product().fetchAll({ require: false })
    if (!products) {
      return res.status(400).json({
        success: false,
        message: 'Product not found',
      })
    }
    res.json({ success: true, data: { ...products.models } })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
})

module.exports = router
