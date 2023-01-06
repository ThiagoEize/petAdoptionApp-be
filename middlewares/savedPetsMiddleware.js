const Ajv = require('ajv');
const ajv = new Ajv();
const SavedPetsModel = require('../models/savedPetsModel');

const isValidId = async (req, res, next) => {
    const { savedPetId } = req.params;
    const savedPet = await SavedPetsModel.readSavedPetModel(savedPetId);
    if (!savedPet) {
        res.status(400).send('There is no existing saved pet selected');
        return;
    }
    next();
}

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

module.exports = { isNewSavedPet, isValidId };