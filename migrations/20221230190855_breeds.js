exports.up = function (knex) {
    return knex.schema.createTable('breeds', (table) => {
        table.increments('id').primary();
        table.integer('specieId').unsigned().notNull();
        table.string('breedName').notNull();
        table.boolean('isHypoallergenic').notNull();

        table.timestamp('dateCreated').defaultTo(knex.fn.now());

        // table.foreign('permissionId').references('referenced_column').inTable('referenced_table');
        table.foreign('specieId').references('species.id');
    });

};

exports.down = function (knex) {
    return knex.schema.dropTable('breeds');
};