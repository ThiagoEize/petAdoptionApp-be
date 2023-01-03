const Ajv = require('ajv');
const ajv = new Ajv();
const SpeciesModel = require('../models/speciesModel');

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

module.exports = { isNewSpecie };