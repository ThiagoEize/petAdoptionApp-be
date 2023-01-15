exports.up = function (knex) {
    return knex.schema.table('pets', function (table) {
        table.float('petAge').alter();
    });
};

exports.down = function (knex) {
    return knex.schema.table('pets', function (table) {
        table.dropColumn('petAge');
    });
};