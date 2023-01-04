const dbConnection = require('../knex/knex')

// async function readAllDietaryRestrictionsModel(query) {
//     try {
//         const dietaryRestrictionsList = await dbConnection.from('dietaryRestrictions')
//             .leftJoin('pets', 'pets.id', '=', 'dietaryRestrictions.petId')
//             .select('dietaryRestrictions.*', 'pets.petName')
//             .where(query)
//         return dietaryRestrictionsList
//     } catch (err) {
//         console.log(err);
//     }
// }

async function readAllDietaryRestrictionsModel(query) {
    try {
        let dietaryRestrictionsList = dbConnection
            .from('dietaryRestrictions')
            .leftJoin('pets', 'pets.id', '=', 'dietaryRestrictions.petId')
        for (let [key, value] of Object.entries(query)) {
            if (value[0] === '%') {
                const searchTerm = value.substring(0, value.lastIndexOf('%') + 1);
                dietaryRestrictionsList = dietaryRestrictionsList.where(key, 'like', searchTerm);
            } else {
                dietaryRestrictionsList = dietaryRestrictionsList.where(key, value);
            }
        }

        dietaryRestrictionsList = await dietaryRestrictionsList.select('dietaryRestrictions.*', 'pets.petName');
        return dietaryRestrictionsList;
    } catch (err) {
        console.log(err);
    }
}

const getDietaryRestrictionByNameModel = async (name) => {
    try {
        const dietaryRestriction = await dbConnection.from('dietaryRestrictions')
            .leftJoin('pets', 'pets.id', '=', 'dietaryRestrictions.petId')
            .select('dietaryRestrictions.*', 'pets.petName')
            .where({ dietaryRestrictionName: name })
            .first()
        return dietaryRestriction
    } catch (err) {
        console.log(err);
    }
};

async function readDietaryRestrictionModel(dietaryRestrictionId) {
    try {
        const dietaryRestriction = await dbConnection
            .from('dietaryRestrictions')
            .leftJoin('pets', 'pets.id', '=', 'dietaryRestrictions.petId')
            .select('dietaryRestrictions.*', 'pets.petName')
            .where({ 'dietaryRestrictions.id': dietaryRestrictionId })
            .first()

        return dietaryRestriction
    } catch (err) {
        console.log(err);
    }
}

async function addDietaryRestrictionModel(newDietaryRestriction) {
    try {
        const [id] = await dbConnection('dietaryRestrictions')
            .insert(newDietaryRestriction)
        const newRegister = await readDietaryRestrictionModel(id)
        console.log('dietaryRestrictionsModel', newRegister)
        return newRegister
    } catch (err) {
        console.log(err);
    }
}

async function editDietaryRestrictionModel(dietaryRestrictionId, updatedDietaryRestriction) {
    try {
        const updated = await dbConnection.from('dietaryRestrictions')
            .where({ id: dietaryRestrictionId })
            .update(updatedDietaryRestriction)


        const updatedRegister = await readDietaryRestrictionModel(dietaryRestrictionId)
        return updatedRegister

    } catch (err) {
        console.log(err);
    }
}

async function deleteDietaryRestrictionModel(dietaryRestrictionId) {
    try {
        const deleted = await dbConnection.from('dietaryRestrictions').where({ id: dietaryRestrictionId }).del()
        return deleted
    } catch (err) {
        console.log(err);
    }
}

async function doesDietaryRestrictionExistModel(email) {
    try {
        const dietaryRestriction = await dbConnection.from('dietaryRestrictions').where({
            email: email
        }).first()
        return dietaryRestriction
    } catch (err) {
        console.log(err);
    }
}

async function isNewDietaryRestrictionModel(foodName, petId, id) {
    try {
        const query = dbConnection.from('dietaryRestrictions')
            .where(
                {
                    petId: petId,
                    foodName: foodName
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
    readAllDietaryRestrictionsModel,
    readDietaryRestrictionModel,
    addDietaryRestrictionModel,
    doesDietaryRestrictionExistModel,
    editDietaryRestrictionModel,
    deleteDietaryRestrictionModel,
    getDietaryRestrictionByNameModel,
    isNewDietaryRestrictionModel
};