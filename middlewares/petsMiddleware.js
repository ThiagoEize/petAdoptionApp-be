const Ajv = require('ajv');
const ajv = new Ajv();
const PetsModel = require('../models/petsModel');

const isNewPet = async (req, res, next) => {
    const { petId } = req.params;
    const { petName, breedId, color, petBio } = req.body;
    const pet = await PetsModel.isNewPetModel(breedId, petName, color, petBio, petId);
    if (pet) {
        res.status(400).send('Pet already exists');
        return;
    }
    next();
};

module.exports = { isNewPet };