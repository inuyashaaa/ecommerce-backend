const bookshelf = require('../databases')

const Product = bookshelf.model('Product', {
  tableName: 'product',
})

module.exports = Product
