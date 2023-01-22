const savedPetsModel = require('../models/savedPetsModel');

async function getSavedPets(req, res) {
    try {
        const query = req.query;
        const savedPets = await savedPetsModel.readAllSavedPetsModel(query);
        res.send({
            success: true,
            data: savedPets
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function getSavedPet(req, res) {
    try {
        const savedPet = await savedPetsModel.readSavedPetModel(req.params.savedPetId);
        res.send({
            success: true,
            data: savedPet
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function getUserSavedPets(req, res) {
    try {
        const userSavedPets = await savedPetsModel.readUserSavedPetsModel(req.params.userId);
        res.send({
            success: true,
            data: userSavedPets
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function addSavedPet(req, res) {
    try {
        const newSavedPet = req.body;
        const savedSavedPet = await savedPetsModel.addSavedPetModel(newSavedPet);
        res.send({
            success: true,
            data: savedSavedPet
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function editSavedPet(req, res) {
    try {
        const updatedSavedPet = req.body;
        const updated = await savedPetsModel.editSavedPetModel(req.params.savedPetId, updatedSavedPet);
        res.send(updated);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function deleteSavedPet(req, res) {
    try {
        const deleted = await savedPetsModel.deleteSavedPetModel(req.params.savedPetId);
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
    getSavedPets,
    getSavedPet,
    getUserSavedPets,
    addSavedPet,
    editSavedPet,
    deleteSavedPet
};