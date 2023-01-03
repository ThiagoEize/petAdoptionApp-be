exports.up = function (knex) {
    return knex.schema.createTable('dietaryRestrictions', (table) => {
        table.increments('id').primary();
        table.integer('petId').unsigned().notNull();
        table.string('foodName').notNull();
        table.string('description');
        table.timestamp('dateCreated').defaultTo(knex.fn.now());

        table.foreign('petId').references('pets.id');
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('dietaryRestrictions');
};