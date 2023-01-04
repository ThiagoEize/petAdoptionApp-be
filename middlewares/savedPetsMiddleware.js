const Ajv = require('ajv');
const ajv = new Ajv();
const SavedPetsModel = require('../models/savedPetsModel');

const isNewSavedPet = async (req, res, next) => {
    const { savedPetId } = req.params;
    const { userId, petId } = req.body;
    const savedPet = await SavedPetsModel.isNewSavedPetModel(userId, petId, savedPetId);
    if (savedPet) {
        res.status(400).send('Pet already saved');
        return;
    }
    next();
};

module.exports = { isNewSavedPet };