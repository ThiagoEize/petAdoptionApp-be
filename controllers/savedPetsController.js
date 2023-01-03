const adoptionRequestsModel = require('../models/adoptionRequestsModel');

async function readAllAdoptionRequests(req, res) {
    try {
        const adoptionRequests = await adoptionRequestsModel.readAllAdoptionRequestsModel();
        res.send(adoptionRequests);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function readSavedPet(req, res) {
    try {
        const adoptionRequest = await adoptionRequestsModel.readSavedPetModel(req.params.id);
        res.send(adoptionRequest);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function readUserAdoptionRequests(req, res) {
    try {
        const userAdoptionRequests = await adoptionRequestsModel.readUserAdoptionRequestsModel(req.params.userId);
        res.send(userAdoptionRequests);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function addSavedPet(req, res) {
    try {
        const newAdoptionRequest = req.body;
        const savedAdoptionRequest = await adoptionRequestsModel.addSavedPetModel(newAdoptionRequest);
        res.send(savedAdoptionRequest);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function editSavedPet(req, res) {
    try {
        const updatedAdoptionRequest = req.body;
        const updated = await adoptionRequestsModel.editSavedPetModel(req.params.id, updatedAdoptionRequest);
        res.send(updated);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function deleteSavedPet(req, res) {
    try {
        const deleted = await adoptionRequestsModel.deleteSavedPetModel(req.params.id);
        res.send(deleted);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}