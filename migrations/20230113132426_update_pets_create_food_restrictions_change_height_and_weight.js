exports.up = function (knex) {
    return knex.schema.table('pets', function (table) {
        table.string('foodRestrictions').notNull().after('petBio');
    });
};

exports.down = function (knex) {
    return knex.schema.table('pets', function (table) {
        table.dropColumn('foodRestrictions');
    });
};