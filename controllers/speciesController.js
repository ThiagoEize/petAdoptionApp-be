const SpeciesModel = require('../models/speciesModel');

async function getSpecies(req, res) {
    try {
        const query = req.query;
        const species = await SpeciesModel.readAllSpeciesModel(query);

        res.send({
            success: true,
            data: species
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function getSpecie(req, res) {
    try {
        const specieId = req.params.specieId;
        const specie = await SpeciesModel.readSpecieModel(specieId);
        res.send({
            success: true,
            data: specie
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function addSpecie(req, res) {
    try {
        const newSpecie = req.body;
        const savedSpecie = await SpeciesModel.addSpecieModel(newSpecie);
        res.send({
            success: true,
            data: savedSpecie
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function editSpecie(req, res) {
    try {
        const updatedSpecie = req.body;
        const updated = await SpeciesModel.editSpecieModel(req.params.specieId, updatedSpecie);
        res.send({
            success: true,
            data: updated
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function deleteSpecie(req, res) {
    try {
        const deleted = await SpeciesModel.deleteSpecieModel(req.params.specieId);
        res.send({
            success: true,
            data: deleted
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports = {
    getSpecies,
    getSpecie,
    addSpecie,
    editSpecie,
    deleteSpecie
};