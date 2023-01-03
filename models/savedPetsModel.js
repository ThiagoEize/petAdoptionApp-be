const dbConnection = require('../knex/knex')

async function readAllSavedPetsModel() {
    try {
        const savedPetsList = await dbConnection.from('savedPets')
            .join('users', 'users.id', '=', 'savedPets.userId')
            .join('pets', 'pets.id', '=', 'savedPets.petId')
            .select('savedPets.id as id', 'users.name as userName',
                'pets.petName as petName', 'savedPets.personalComentary',
                'savedPets.dateCreated')
        return savedPetsList
    } catch (err) {
        console.log(err);
    }
}

async function readSavedPetModel(savedPetId) {
    try {
        const savedPet = await dbConnection.from('savedPets')
            .join('users', 'users.id', '=', 'savedPets.userId')
            .join('pets', 'pets.id', '=', 'savedPets.petId')
            .where({ 'savedPets.id': savedPetId })
            .select('savedPets.id as id', 'users.name as userName', 'pets.petName as petName', 'savedPets.personalComentary', 'savedPets.dateCreated')
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
        const [newRegister] = await dbConnection.from('savedPets').insert(newSavedPet).returning('*')
        return newRegister
    } catch (err) {
        console.log(err);
    }
}

async function editSavedPetModel(savedPetId, updatedSavedPet) {
    try {
        const [updated] = await dbConnection.from('savedPets').where({ id: savedPetId }).update(updatedSavedPet).returning('*')
        return updated
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

module.exports = {
    readAllSavedPetsModel,
    readSavedPetModel,
    addSavedPetModel,
    editSavedPetModel,
    doesSavedPetExistModel,
    readUserSavedPetsModel,
    deleteSavedPetModel
};