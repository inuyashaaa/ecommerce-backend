
exports.up = function (knex) {
  return knex.schema
    .createTable('product', function (table) {
      table.increments('id')
      table.integer('category_id', 11)
      table.enu('gender', ['male', 'female'])
      table.string('name', 255)
      table.text('product_image_file')
      table.string('price', 255)
      table.string('sale', 255)
      table.string('color', 255)
      table.text('style')
      table.text('shown')
      table.integer('star', 11)
      table.timestamp('created_at').defaultTo(knex.fn.now())
      table.timestamp('updated_at').defaultTo(knex.fn.now())
    })
}

exports.down = function (knex) {
  return knex.schema.dropTable('product')
}
