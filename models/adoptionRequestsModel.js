const dbConnection = require('../knex/knex')

async function readAllAdoptionRequestsModel() {
    try {
        const adoptionRequestsList = await dbConnection.from('adoptionRequests')
            .join('users', 'users.id', '=', 'adoptionRequests.userId')
            .join('pets', 'pets.id', '=', 'adoptionRequests.petId')
            .select('adoptionRequests.id as id', 'users.name as userName',
                'pets.petName as petName', 'adoptionRequests.personalComentary',
                'adoptionRequests.dateCreated')
        return adoptionRequestsList
    } catch (err) {
        console.log(err);
    }
}

async function readAdoptionRequestModel(adoptionRequestId) {
    try {
        const adoptionRequest = await dbConnection.from('adoptionRequests')
            .join('users', 'users.id', '=', 'adoptionRequests.userId')
            .join('pets', 'pets.id', '=', 'adoptionRequests.petId')
            .where({ 'adoptionRequests.id': adoptionRequestId })
            .select('adoptionRequests.id as id', 'users.name as userName', 'pets.petName as petName', 'adoptionRequests.personalComentary', 'adoptionRequests.dateCreated')
            .first()
        return adoptionRequest
    } catch (err) {
        console.log(err);
    }
}

async function readUserAdoptionRequestsModel(userId) {
    try {
        const userAdoptionRequests = await dbConnection.from('adoptionRequests')
            .join('users', 'adoptionRequests.userId', '=', 'users.id')
            .join('pets', 'adoptionRequests.petId', '=', 'pets.id')
            .where({ userId: userId })
        return userAdoptionRequests
    } catch (err) {
        console.log(err);
    }
}

async function addAdoptionRequestModel(newAdoptionRequest) {
    try {
        const [newRegister] = await dbConnection.from('adoptionRequests').insert(newAdoptionRequest).returning('*')
        return newRegister
    } catch (err) {
        console.log(err);
    }
}

async function editAdoptionRequestModel(adoptionRequestId, updatedAdoptionRequest) {
    try {
        const [updated] = await dbConnection.from('adoptionRequests').where({ id: adoptionRequestId }).update(updatedAdoptionRequest).returning('*')
        return updated
    } catch (err) {
        console.log(err);
    }
}

async function deleteAdoptionRequestModel(savedPetId) {
    try {
        const deleted = await dbConnection.from('savedPets').where({ id: savedPetId }).del()
        return deleted
    } catch (err) {
        console.log(err);
    }
}

async function doesAdoptionRequestExistModel(userId, petId) {
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
    readAllAdoptionRequestsModel,
    readAdoptionRequestModel,
    addAdoptionRequestModel,
    editAdoptionRequestModel,
    doesAdoptionRequestExistModel,
    readUserAdoptionRequestsModel,
    deleteAdoptionRequestModel
};