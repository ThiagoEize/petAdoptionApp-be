const dbConnection = require('../knex/knex');

async function readAllSpeciesModel(query) {
    try {
        let species = dbConnection.from('species');
        for (let [key, value] of Object.entries(query)) {
            if (value[0] === '%') {
                const searchTerm = value.substring(0, value.lastIndexOf('%') + 1);
                species = species.where(key, 'like', searchTerm);
            } else {
                species = species.where(key, value);
            }
        }

        species = await species.select('*');
        return species;
    } catch (err) {
        console.log(err);
    }
}

async function readSpecieModel(id) {
    try {
        const specie = await dbConnection('species')
            .where({ 'species.id': id })
            .first();
        return specie;
    } catch (err) {
        console.log(err);
    }
}

async function addSpecieModel(newSpecie) {
    try {
        const [newSpecieId] = await dbConnection('species').insert(newSpecie);
        const newSpecieObject = await readSpecieModel(newSpecieId);
        return newSpecieObject;
    } catch (err) {
        console.log(err);
    }
}

async function editSpecieModel(id, updatedSpecie) {
    try {
        const updated = await dbConnection('species')
            .where({ id })
            .update(updatedSpecie);
        const updatedSpecieObject = await readSpecieModel(id);
        return updatedSpecieObject;
    } catch (err) {
        console.log(err);
    }
}

async function deleteSpecieModel(specieId) {
    try {
        const deleted = await dbConnection.from('species').where({ id: specieId }).del()
        return deleted
    } catch (err) {
        console.log(err);
    }
}

async function isNewSpecieModel(specieName, id) {
    try {
        const query = dbConnection.from('species')
            .where(
                { specieName: specieName }
            );
        if (id) {
            query.andWhere('id', '!=', id);
        }
        const user = await query.first();
        return user;
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    readAllSpeciesModel,
    readSpecieModel,
    addSpecieModel,
    editSpecieModel,
    deleteSpecieModel,
    isNewSpecieModel
};