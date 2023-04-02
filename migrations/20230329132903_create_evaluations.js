exports.up = function (knex) {
    return knex.schema.createTable('evaluations', (table) => {
        table.increments('id').primary();
        table.integer('adoptionHouseId').unsigned().notNull();
        table.foreign('adoptionHouseId').references('fosteringhouses.id');
        table.integer('userId').unsigned().notNull();
        table.foreign('userId').references('users.id');
        table.integer('score').notNull();
        table.string('description');
        table.timestamp('dateCreated').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('evaluations');
};