const { db } = require('./src/configs')

module.exports = {
  development: {
    ...db,
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  staging: {
    ...db,
    migrations: {
      tableName: 'knex_migrations',
    },
  },
  production: {
    ...db,
    migrations: {
      tableName: 'knex_migrations',
    },
  },
}
