exports.up = function (knex) {
    return knex.schema.createTable('species', (table) => {
        table.increments('id').primary();
        table.string('specieName').notNull();
        table.timestamp('dateCreated').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('species');
};
