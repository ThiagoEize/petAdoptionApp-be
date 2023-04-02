exports.up = function (knex) {
    return knex.schema.createTable('expenses', (table) => {
        table.increments('id').primary();
        table.string('description').notNull();
        table.decimal('cost', 10, 2).notNull();
        table.timestamp('dateCreated').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('expenses');
};