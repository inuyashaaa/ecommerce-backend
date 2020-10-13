const _ = require('lodash')
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
    const data = products.models
    const newData = _.map(data, (product) => {
      const prod = product.attributes
      prod.product_image_file = `${process.env.ASSET_URL}${prod.product_image_file}`
      const price = parseFloat(prod.price || 0)
      const sale = parseFloat(prod.sale)
      const newPrice = price - price * sale / 100
      prod.saledPrice = newPrice.toString()
      return prod
    })
    const flashSale = _.filter(newData, { flash_sale: 1 })
    const megaSale = _.filter(newData, { mega_sale: 1 })
    const responseData = {
      all: newData,
      flashSale,
      megaSale,
    }
    res.json({ success: true, data: responseData })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    })
  }
})

module.exports = router
