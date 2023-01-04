const savedPetsModel = require('../models/savedPetsModel');

async function getSavedPets(req, res) {
    try {
        const savedPets = await savedPetsModel.readAllSavedPetsModel();
        res.send(savedPets);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function getSavedPet(req, res) {
    try {
        const savedPet = await savedPetsModel.readSavedPetModel(req.params.savedPetId);
        res.send(savedPet);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function getUserSavedPets(req, res) {
    try {
        const userSavedPets = await savedPetsModel.readUserSavedPetsModel(req.params.userId);
        res.send(userSavedPets);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function addSavedPet(req, res) {
    try {
        const newSavedPet = req.body;
        const savedSavedPet = await savedPetsModel.addSavedPetModel(newSavedPet);
        res.send(savedSavedPet);
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