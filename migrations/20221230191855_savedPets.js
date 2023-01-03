exports.up = function (knex) {
    return knex.schema.createTable('savedPets', (table) => {
        table.increments('id').primary();
        table.integer('userId').unsigned().notNull();
        table.integer('petId').unsigned().notNull();
        table.string('personalComentary');
        table.timestamp('dateCreated').defaultTo(knex.fn.now());

        // table.foreign('permissionId').references('referenced_column').inTable('referenced_table');
        table.foreign('userId').references('users.id');
        table.foreign('petId').references('pets.id');
    });

};

exports.down = function (knex) {
    return knex.schema.dropTable('savedPets');
};