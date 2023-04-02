exports.up = function (knex) {
    return knex.schema.createTable('addresses', (table) => {
        table.increments('id').primary();
        table.string('addressLine1').notNull();
        table.string('addressLine2');
        table.string('city').notNull();
        table.string('stateProvince').notNull();
        table.string('postalCode').notNull();
        table.string('country').notNull();
        table.decimal('latitude', 10, 6).notNull();
        table.decimal('longitude', 10, 6).notNull();
        table.timestamp('dateCreated').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('addresses');
};