exports.up = function (knex) {
    return knex.schema.createTable('permissions', (table) => {
        table.increments('id').primary();
        table.string('permissionName').notNull();
        table.boolean('canEditCreateAdmins').notNull();
        table.boolean('canEditUsersPermissions').notNull();
        table.boolean('canAcceptAdoptionRequests').notNull();
        table.boolean('canAdoptFosterPets').notNull();
        table.boolean('canAdoptPets').notNull();
        table.timestamp('dateCreated').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('permissions');
};
