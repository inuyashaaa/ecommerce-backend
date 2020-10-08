const bookshelf = require('../databases')

const Category = bookshelf.model('Category', {
  tableName: 'category',
})

module.exports = Category
