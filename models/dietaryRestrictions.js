const dbConnection = require('../knex/knex')

async function readAllDietaryRestrictionsModel() {
    try {
        const dietaryRestrictionsList = await dbConnection.from('dietaryRestrictions').where(query);
        return dietaryRestrictionsList
    } catch (err) {
        console.log(err);
    }
}

async function readDietaryRestrictionModel(restrictionId) {
    try {
        const restriction = await dbConnection.from('dietaryRestrictions').where({ id: restrictionId }).first()
        return restriction
    } catch (err) {
        console.log(err);
    }
}

async function addDietaryRestrictionModel(newRestriction) {
    try {
        const [newRegister] = await dbConnection.from('dietaryRestrictions').insert(newRestriction).returning('*')
        return newRegister
    } catch (err) {
        console.log(err);
    }
}

async function editDietaryRestrictionModel(restrictionId, updatedRestriction) {
    try {
        const [updated] = await dbConnection.from('dietaryRestrictions').where({ id: restrictionId }).update(updatedRestriction).returning('*')
        return updated
    } catch (err) {
        console.log(err);
    }
}

async function deleteDietaryRestrictionModel(restrictionId) {
    try {
        const deleted = await dbConnection.from('dietaryRestrictions').where({ id: restrictionId }).del()
        return deleted
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    readAllDietaryRestrictionsModel,
    readDietaryRestrictionModel,
    addDietaryRestrictionModel,
    editDietaryRestrictionModel,
    deleteDietaryRestrictionModel
};
