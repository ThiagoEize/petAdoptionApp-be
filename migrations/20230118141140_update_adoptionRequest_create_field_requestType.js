exports.up = function (knex) {
    return knex.schema.table('adoptionRequests', (table) => {
        table.string('requestType');
    });
};

exports.down = function (knex) {
    return knex.schema.table('adoptionRequests', (table) => {
        table.dropColumn('requestType');
    });
};