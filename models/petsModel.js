const dbConnection = require('../knex/knex')

async function readAllPetsModel(query) {
    try {

        let petsList = dbConnection
            .from('pets')
            .leftJoin('breeds', 'breeds.id', '=', 'pets.breedId')
            .leftJoin('species', 'species.id', '=', 'breeds.specieId')
            .leftJoin('users', 'users.id', '=', 'pets.userId')
            .select(
                'pets.*',
                'users.userName',
                'species.specieName',
                'breeds.breedName',
            )

        for (let [key, value] of Object.entries(query)) {
            console.log('this is the substring', value.substring(1, value.length));
            if (value[0] === '<') {
                const searchTerm = value.substring(1, value.length);
                petsList = petsList.where(key, '<=', searchTerm);
            } else if (value[0] === '>') {
                const searchTerm = value.substring(1, value.length);
                petsList = petsList.where(key, '>=', searchTerm);
            } else if (value[0] === '%') {
                const searchTerm = value.substring(0, value.lastIndexOf('%') + 1);
                petsList = petsList.where(key, 'like', searchTerm);
            } else {
                petsList = petsList.where(key, value);
            }
        }

        petsList = await petsList
            .select(
                'pets.*',
                'users.userName',
                'species.specieName',
                'breeds.breedName',
            )

        return petsList
    } catch (err) {
        console.log(err);
    }
}

async function readPetModel(petId) {
    try {
        const pet = await dbConnection.from('pets')
            .leftJoin('breeds', 'breeds.id', '=', 'pets.breedId')
            .leftJoin('species', 'species.id', '=', 'breeds.specieId')
            .leftJoin('users', 'users.id', '=', 'pets.userId')
            .select(
                'pets.*',
                'users.userName',
                'species.specieName',
                'breeds.breedName',
            )
            .where({ 'pets.id': petId })
            .first()
        return pet
    } catch (err) {
        console.log(err);
    }
}

async function readUserPetsModel(userId) {
    try {
        const userPets = await dbConnection.from('pets')
            .leftJoin('breeds', 'breeds.id', '=', 'pets.breedId')
            .leftJoin('species', 'species.id', '=', 'breeds.specieId')
            .leftJoin('users', 'users.id', '=', 'pets.userId')
            .select(
                'pets.*',
                'users.userName',
                'species.specieName',
                'breeds.breedName',
            )
            .where({ userId: userId })
        return userPets
    } catch (err) {
        console.log(err);
    }
}

async function addPetModel(newPet) {
    try {
        const [id] = await dbConnection('pets')
            .insert(newPet)

        const newRegister = await readPetModel(id)
        return newRegister
    } catch (err) {
        console.log(err)
    }
}

async function editPetModel(petId, updatedPet) {
    try {
        await dbConnection('pets')
            .where('id', petId)
            .update(updatedPet)

        const updatedRegister = await readPetModel(petId)
        return updatedRegister
    } catch (err) {
        console.log(err)
    }
}

async function aproveRequestModal(petId, updatedPet) {
    try {
        await dbConnection('pets')
            .where('id', petId)
            .update(updatedPet)

        const updatedRegister = await readPetModel(petId)
        return updatedRegister
    } catch (err) {
        console.log(err)
    }
}

async function deletePetModel(petId) {
    try {
        const deleted = await dbConnection.from('pets').where({ id: petId }).del()
        return deleted
    } catch (err) {
        console.log(err);
    }
}

async function doesPetExistModel(breedId, petName, color, petBio) {
    try {
        const pet = await dbConnection.from('pets')
            .where({
                breedId: breedId,
                petName: petName,
                color: color,
                petBio: petBio
            }).first()
        return pet
    } catch (err) {
        console.log(err);
    }
}

async function isNewPetModel(breedId, petName, color, petBio, id) {
    try {
        const query = dbConnection.from('pets')
            .where({
                breedId: breedId,
                petName: petName,
                color: color,
                petBio: petBio
            })
        if (id) {
            query.andWhere('id', '!=', id);
        }
        const pet = await query.first();
        return pet
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    readAllPetsModel,
    readPetModel,
    addPetModel,
    editPetModel,
    aproveRequestModal,
    doesPetExistModel,
    isNewPetModel,
    readUserPetsModel,
    deletePetModel
};