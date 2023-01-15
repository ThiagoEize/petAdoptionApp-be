exports.up = function (knex) {
    return knex.raw(`UPDATE pets SET petAge = CAST(REGEXP_REPLACE(petAge, '[^0-9.]', '') as FLOAT)`);
};
exports.down = function (knex) {
    return knex.raw('UPDATE pets SET petAge = CAST(petAge as TEXT)');
};