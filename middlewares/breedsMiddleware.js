const Ajv = require('ajv');
const ajv = new Ajv();
const BreedsModel = require('../models/breedsModel');

const isNewBreed = async (req, res, next) => {
    const { breedId } = req.params;
    const { specieId, breedName } = req.body;
    const breed = await BreedsModel.isNewBreedModel(breedName, specieId, breedId);
    if (breed) {
        res.status(400).send('Breed already exists');
        return;
    }
    next();
};

module.exports = { isNewBreed };