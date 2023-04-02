exports.up = function (knex) {
    return knex.schema.createTable('fosteringHouses', function (table) {
        table.increments('id').primary();
        table.string('fosteringHouseName').notNull();
        table.string('phoneNumber').notNull();
        table.string('email').notNull();
        table.float('avaluationNumbers').unsigned().notNull();
        table.float('score').unsigned().notNull();
        table.timestamp('dateCreated').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('fosteringHouses');
};