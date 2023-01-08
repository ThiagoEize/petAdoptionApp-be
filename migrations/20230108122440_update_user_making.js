exports.up = function (knex) {
    return knex.schema.table('users', (table) => {
        table.integer('permissionId').unsigned().nullable().alter();
    });
};

exports.down = function (knex) {
    return knex.schema.table('users', (table) => {
        table.integer('permissionId').unsigned().notNull().alter();
    });
};
