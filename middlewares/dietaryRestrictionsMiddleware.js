const Ajv = require('ajv');
const ajv = new Ajv();
const DietaryRestrictionsModel = require('../models/dietaryRestrictionsModel');

const isValidId = async (req, res, next) => {
    const { dietaryRestrictionId } = req.params;
    const dietaryRestriction = await DietaryRestrictionsModel.readDietaryRestrictionModel(dietaryRestrictionId);
    if (!dietaryRestriction) {
        res.status(400).send('There is no existing dietary restriction selected');
        return;
    }
    next();
}

const isNewDietaryRestriction = async (req, res, next) => {
    const { dietaryRestrictionId } = req.params;
    const { petId, foodName } = req.body;
    console.log('reqBody', req.body);
    const dietaryRestriction = await DietaryRestrictionsModel.isNewDietaryRestrictionModel(foodName, petId, dietaryRestrictionId);
    if (dietaryRestriction) {
        res.status(400).send('Dietary restriction already added for this pet');
        return;
    }
    next();
};

module.exports = { isNewDietaryRestriction, isValidId };