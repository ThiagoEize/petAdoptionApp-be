const Ajv = require('ajv');
const ajv = new Ajv();
const SpeciesModel = require('../models/speciesModel');

const canAcess = async (req, res, next) => {
    console.log('canAcess', req.userId);
    next();
}

const isValidId = async (req, res, next) => {
    const { specieId } = req.params;
    const specie = await SpeciesModel.readSpecieModel(specieId);
    if (!specie) {
        res.status(400).send('There is no existing specie selected');
        return;
    }
    next();
}

const isNewSpecie = async (req, res, next) => {
    const { specieId } = req.params;
    const { specieName } = req.body;
    const specie = await SpeciesModel.isNewSpecieModel(specieName, specieId);
    if (specie) {
        res.status(400).send('Specie already exists');
        return;
    }
    next();
};

module.exports = { canAcess, isNewSpecie, isValidId };