
exports.up = function (knex) {
  return knex.schema
    .createTable('users', function (table) {
      table.increments('id')
      table.string('fullname', 255)
      table.string('email', 255).notNullable()
      table.string('avatar', 255)
      table.string('password', 255)
      table.enu('gender', ['male', 'female', 'other'])
      table.datetime('birthday')
      table.string('phone', 100)
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('users')
}
