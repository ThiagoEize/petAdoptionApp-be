exports.up = function (knex) {
    return knex.schema.table('breeds', (table) => {
        table.boolean('isHypoallergenic').defaultTo(false).alter();
    });
};

exports.down = function (knex) {
    return knex.schema.table('breeds', (table) => {
        table.boolean('isHypoallergenic').alter();
    });
};