exports.up = function (knex) {
    return knex.raw(`UPDATE pets SET height = CAST(REGEXP_REPLACE(height, '[^0-9.]', '') as FLOAT), weight = CAST(REGEXP_REPLACE(weight, '[^0-9.]', '') as FLOAT)`);
};
exports.down = function (knex) {
    return knex.raw('UPDATE pets SET height = CAST(height as TEXT), weight = CAST(weight as TEXT)');
};