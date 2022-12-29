exports.up = function (knex) {
    return knex.schema.createTable('users', (table) => {
        table.increments('id').primary();
        table.integer('permissionId');
        table.string('email').notNull();
        table.string('password').notNull();
        table.string('userName').notNull();
        table.string('userLastName').notNull();
        table.string('phoneNumber').notNull();
        table.string('userBio').notNull();
        table.timestamp('dateCreated').defaultTo(knex.fn.now());

        table.foreign('permissionId').references('permissions.id')
    });

};

exports.down = function (knex) {
    return knex.schema.dropTable('users');
};