exports.up = function (knex) {
    return knex.schema.table('pets', (table) => {
        table.integer('userId').unsigned().nullable().alter();
    });
};

exports.down = function (knex) {
    return knex.schema.table('pets', (table) => {
        table.integer('userId').unsigned().notNull().alter();
    });
};