exports.up = function (knex) {
    return knex.schema.table('pets', function (table) {
        table.float('height').alter();
        table.float('weight').alter();
    });
};

exports.down = function (knex) {
    return knex.schema.table('pets', function (table) {
        table.dropColumn('height');
        table.dropColumn('weight');
    });
};