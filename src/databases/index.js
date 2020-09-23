// Setting up the database connection
const knex = require('knex')({
  client: 'mysql',
  connection: {
    host: '127.0.0.1',
    user: 'huymanh',
    password: 'huymanh',
    database: 'ecommerce',
    charset: 'utf8mb4'
  }
})

const bookshelf = require('bookshelf')(knex)

module.exports = bookshelf

const User = bookshelf.model('User', {
  tableName: 'users'
})
