exports.up = function (knex) {
    return knex.schema.createTable('pets', (table) => {
        table.increments('id').primary();
        table.integer('userId').unsigned().notNull();
        table.integer('breedId').unsigned().notNull();
        table.integer('specieId').unsigned().notNull();
        table.string('petName').notNull();
        table.string('adoptionStatus').notNull();
        table.string('picture').notNull();
        table.string('petAge').notNull();
        table.string('height').notNull();
        table.string('weight').notNull();
        table.string('color').notNull();
        table.string('petBio').notNull();

        table.timestamp('dateCreated').defaultTo(knex.fn.now());

        // table.foreign('permissionId').references('referenced_column').inTable('referenced_table');
        table.foreign('userId').references('users.id');
        table.foreign('breedId').references('breeds.id');
        table.foreign('specieId').references('species.id');
    });

};

exports.down = function (knex) {
    return knex.schema.dropTable('pets');
};