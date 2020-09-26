const bookshelf = require('../databases')

const User = bookshelf.model('User', {
  tableName: 'users',
})

module.exports = User
