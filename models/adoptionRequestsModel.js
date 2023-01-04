const dbConnection = require('../knex/knex')

async function readAllAdoptionRequestsModel() {
    try {
        const adoptionRequestsList = await dbConnection.from('adoptionRequests')
            .join('users', 'users.id', '=', 'adoptionRequests.userId')
            .join('pets', 'pets.id', '=', 'adoptionRequests.petId')
            .select('adoptionRequests.*', 'users.userName', 'pets.petName')
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
            .select('adoptionRequests.*', 'users.userName', 'pets.petName')
            .where({ 'adoptionRequests.id': adoptionRequestId })
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
        const [id] = await dbConnection('adoptionRequests')
            .insert(newAdoptionRequest)
        const newRegister = await readAdoptionRequestModel(id)

        return newRegister
    } catch (err) {
        console.log(err);
    }
}

async function editAdoptionRequestModel(adoptionRequestId, updatedAdoptionRequest) {
    try {
        const updated = await dbConnection.from('adoptionRequests')
            .where({ id: adoptionRequestId })
            .update(updatedAdoptionRequest)

        const updatedRegister = await readAdoptionRequestModel(adoptionRequestId)
        return updatedRegister

    } catch (err) {
        console.log(err);
    }
}

async function deleteAdoptionRequestModel(adoptionRequestId) {
    try {
        const deleted = await dbConnection.from('adoptionRequests').where({ id: adoptionRequestId }).del()
        return deleted
    } catch (err) {
        console.log(err);
    }
}

async function doesAdoptionRequestExistModel(userId, petId) {
    try {
        const adoptionRequest = await dbConnection.from('adoptionRequests').where({
            userId: userId,
            petId: petId
        }).first()
        if (adoptionRequest) {
            return true
        } else {
            return false
        }
    } catch (err) {
        console.log(err);
    }
}

async function isNewAdoptionRequestModel(userId, petId, id) {
    try {
        const query = dbConnection.from('adoptionRequests')
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
    readAllAdoptionRequestsModel,
    readAdoptionRequestModel,
    addAdoptionRequestModel,
    editAdoptionRequestModel,
    doesAdoptionRequestExistModel,
    readUserAdoptionRequestsModel,
    deleteAdoptionRequestModel,
    isNewAdoptionRequestModel
};