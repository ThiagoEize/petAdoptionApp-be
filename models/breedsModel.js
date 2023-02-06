const dbConnection = require('../knex/knex')

async function readAllBreedsModel(query) {
    try {
        let breedsList = dbConnection
            .from('breeds')
            .leftJoin('species', 'species.id', '=', 'breeds.specieId')
        for (let [key, value] of Object.entries(query)) {
            if (value[0] === '%') {
                const searchTerm = value.substring(0, value.lastIndexOf('%') + 1);
                breedsList = breedsList.where(key, 'like', searchTerm);
            } else {
                breedsList = breedsList.where(key, value);
            }
        }

        breedsList = await breedsList.select('breeds.*', 'species.specieName');
        return breedsList;
    } catch (err) {
        console.log(err);
    }
}

const getBreedByNameModel = async (name) => {
    try {
        const breed = await dbConnection.from('breeds')
            .leftJoin('species', 'species.id', '=', 'breeds.specieId')
            .select('breeds.*', 'species.specieName')
            .where({ breedName: name })
            .first()
        return breed
    } catch (err) {
        console.log(err);
    }
};

async function readBreedModel(breedId) {
    try {
        const breed = await dbConnection
            .from('breeds')
            .leftJoin('species', 'species.id', '=', 'breeds.specieId')
            .select('breeds.*', 'species.specieName')
            .where({ 'breeds.id': breedId })
            .first()

        return breed
    } catch (err) {
        console.log(err);
    }
}

async function addBreedModel(newBreed) {
    try {
        const [id] = await dbConnection('breeds')
            .insert(newBreed)
        const newRegister = await readBreedModel(id)
        return newRegister
    } catch (err) {
        console.log(err);
    }
}

async function editBreedModel(breedId, updatedBreed) {
    try {
        const updated = await dbConnection.from('breeds')
            .where({ id: breedId })
            .update(updatedBreed)


        const updatedRegister = await readBreedModel(breedId)
        return updatedRegister

    } catch (err) {
        console.log(err);
    }
}

async function deleteBreedModel(breedId) {
    try {
        const deleted = await dbConnection.from('breeds').where({ id: breedId }).del()
        return deleted
    } catch (err) {
        console.log(err);
    }
}

async function doesBreedExistModel(email) {
    try {
        const breed = await dbConnection.from('breeds').where({
            email: email
        }).first()
        return breed
    } catch (err) {
        console.log(err);
    }
}

async function isNewBreedModel(breedName, specieId, id) {
    try {
        const query = dbConnection.from('breeds')
            .where(
                {
                    specieId: specieId,
                    breedName: breedName
                }
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
    readAllBreedsModel,
    readBreedModel,
    addBreedModel,
    doesBreedExistModel,
    editBreedModel,
    deleteBreedModel,
    getBreedByNameModel,
    isNewBreedModel
};