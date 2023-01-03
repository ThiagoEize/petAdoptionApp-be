exports.up = function (knex) {
    return knex.schema.table('pets', (table) => {
        table.dropForeign('specieId');
        table.dropColumn('specieId');
    });
};

exports.down = function (knex) {
    return knex.schema.table('pets', (table) => {
        table.integer('specieId').unsigned();
        table.foreign('specieId').references('species.id');
    });
};