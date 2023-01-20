const PetsModel = require('../models/PetsModel');

async function getPets(req, res) {
    try {
        const query = req.query;

        const pets = await PetsModel.readAllPetsModel(query);
        res.send({
            success: true,
            data: pets
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function getPet(req, res) {
    try {
        const pet = await PetsModel.readPetModel(req.params.petId);
        res.send({
            success: true,
            data: pet
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function getUserPets(req, res) {
    try {
        const userPets = await PetsModel.readUserPetsModel(req.params.userId);
        res.send({
            success: true,
            data: userPets
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function addPet(req, res) {
    try {
        console.log('addPet pict', req.file.path);
        console.log(req.body);
        const newPet = { ...req.body, picture: req.file.path };
        const savedPet = await PetsModel.addPetModel(newPet);
        // const savedPet = await PetsModel.addPetModel(req.body);
        if (!savedPet) {
            res.status(400).send('Invalid pet');
            return
        }
        res.send({
            success: true,
            data: savedPet
        });

    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function editPet(req, res) {
    try {
        // const updatedPet = req.body;
        // console.log('updatedPet', updatedPet);
        // console.log('req.file.path', req.file.path);
        let updatedPet
        if (req.file && req.file.path) {
            updatedPet = { ...req.body, picture: req.file.path };
        } else {
            updatedPet = req.body;
        }
        const updated = await PetsModel.editPetModel(req.params.petId, updatedPet);
        res.send({
            success: true,
            data: updated
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function aprovedAdoption(req, res) {
    try {
        const updated = await PetsModel.aproveRequestModal(req.params.petId, req.body);
        console.log('req body for aproving', req.body);
        res.send({
            success: true,
            data: updated
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function deletePet(req, res) {
    try {
        const deleted = await PetsModel.deletePetModel(req.params.petId);
        res.send({
            success: true,
            data: deleted
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

module.exports = { addPet, getPets, getPet, getUserPets, editPet, aprovedAdoption, deletePet }