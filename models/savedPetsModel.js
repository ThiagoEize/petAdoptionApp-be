const dbConnection = require('../knex/knex')

async function readAllSavedPetsModel(query) {
    // try {
    //     const savedPetsList = await dbConnection.from('savedPets')
    //         .join('users', 'users.id', '=', 'savedPets.userId')
    //         .join('pets', 'pets.id', '=', 'savedPets.petId')
    //         .select('savedPets.*', 'users.userName', 'pets.petName')
    //         .where(query)
    //     return savedPetsList
    // } catch (err) {
    //     console.log(err);
    // }

    try {
        let savedPetsList = dbConnection
            .from('savedPets')
            .join('users', 'users.id', '=', 'savedPets.userId')
            .join('pets', 'pets.id', '=', 'savedPets.petId')
        for (let [key, value] of Object.entries(query)) {
            if (value[0] === '%') {
                const searchTerm = value.substring(0, value.lastIndexOf('%') + 1);
                savedPetsList = savedPetsList.where(key, 'like', searchTerm);
            } else {
                savedPetsList = savedPetsList.where(key, value);
            }
        }

        savedPetsList = await savedPetsList.select('savedPets.*', 'users.userName', 'pets.petName')

        return savedPetsList;
    } catch (err) {
        console.log(err);
    }
}

async function readSavedPetModel(savedPetId) {
    try {
        const savedPet = await dbConnection.from('savedPets')
            .join('users', 'users.id', '=', 'savedPets.userId')
            .join('pets', 'pets.id', '=', 'savedPets.petId')
            .select('savedPets.*', 'users.userName', 'pets.petName')
            .where({ 'savedPets.id': savedPetId })
            .first()
        return savedPet
    } catch (err) {
        console.log(err);
    }
}

async function readUserSavedPetsModel(userId) {
    try {
        const userSavedPets = await dbConnection.from('savedPets')
            .join('users', 'savedPets.userId', '=', 'users.id')
            .join('pets', 'savedPets.petId', '=', 'pets.id')
            .where({ userId: userId })
        return userSavedPets
    } catch (err) {
        console.log(err);
    }
}

async function addSavedPetModel(newSavedPet) {
    try {
        const [id] = await dbConnection('savedPets')
            .insert(newSavedPet)
        const newRegister = await readSavedPetModel(id)

        return newRegister
    } catch (err) {
        console.log(err);
    }
}

async function editSavedPetModel(savedPetId, updatedSavedPet) {
    try {
        const updated = await dbConnection.from('savedPets')
            .where({ id: savedPetId })
            .update(updatedSavedPet)

        const updatedRegister = await readSavedPetModel(savedPetId)
        return updatedRegister

    } catch (err) {
        console.log(err);
    }
}

async function deleteSavedPetModel(savedPetId) {
    try {
        const deleted = await dbConnection.from('savedPets').where({ id: savedPetId }).del()
        return deleted
    } catch (err) {
        console.log(err);
    }
}

async function doesSavedPetExistModel(userId, petId) {
    try {
        const savedPet = await dbConnection.from('savedPets').where({
            userId: userId,
            petId: petId
        }).first()
        if (savedPet) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log(err);
    }
}

async function isNewSavedPetModel(userId, petId, id) {
    try {
        const query = dbConnection.from('savedPets')
            .where(
                {
                    userId: userId,
                    petId: petId
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
    readAllSavedPetsModel,
    readSavedPetModel,
    addSavedPetModel,
    editSavedPetModel,
    doesSavedPetExistModel,
    readUserSavedPetsModel,
    deleteSavedPetModel,
    isNewSavedPetModel
};