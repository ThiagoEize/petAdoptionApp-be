exports.up = function (knex) {
    return knex.schema.createTable('adoptionRequests', (table) => {
        table.increments('id').primary();
        table.integer('userId').unsigned().notNull();
        table.integer('petId').unsigned().notNull();
        table.string('adoptionRequestMessage');
        table.string('requestStatus').defaultTo('Waiting for approval');

        table.timestamp('dateCreated').defaultTo(knex.fn.now());

        table.foreign('petId').references('pets.id');
        table.foreign('userId').references('users.id');
    });

};

exports.down = function (knex) {
    return knex.schema.dropTable('adoptionRequests');
};