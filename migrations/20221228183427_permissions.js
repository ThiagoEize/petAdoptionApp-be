exports.up = function (knex) {

    return knex.schema.createTable('permissions', (table) => {
        table.increments('id').primary();
        table.string('permissionName').notNull();
        table.string('canEditCreateAdmins').notNull();
        table.string('canEditUsersPermissions').notNull();
        table.string('canAcceptAdoptionRequests').notNull();
        table.string('canAdoptFosterPets').notNull();
        table.string('canAdoptPets').notNull();
        table.timestamp('dateCreated').defaultTo(knex.fn.now());
    });
};

exports.down = function (knex) {
    return knex.schema.dropTable('permissions');
};
