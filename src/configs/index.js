'use strict'

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config()
}
module.exports = Object.freeze({
  db: {
    client: 'mysql',
    connection: {
      host: process.env.DB_HOST || 'localhost',
      database: process.env.DB_NAME || 'ecommerce',
      user: process.env.DB_USERNAME || 'huymanh',
      password: process.env.DB_PASSWORD || 'huymanh',
      charset: 'utf8mb4'
    },
    pool: {
      min: 2,
      max: 10
    }
  },
  app: {
    port: parseInt(process.env.PORT) || 3003
  },
})
