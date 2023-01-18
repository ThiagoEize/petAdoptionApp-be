const adoptionRequestsModel = require('../models/adoptionRequestsModel');

async function getAdoptionRequests(req, res) {
    try {
        const query = req.query;
        const adoptionRequests = await adoptionRequestsModel.readAllAdoptionRequestsModel(query);
        res.send({
            success: true,
            data: adoptionRequests
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function getAdoptionRequest(req, res) {
    try {
        const adoptionRequest = await adoptionRequestsModel.readAdoptionRequestModel(req.params.adoptionRequestId);
        res.send({
            success: true,
            data: adoptionRequest
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function getUserAdoptionRequests(req, res) {
    try {
        const userAdoptionRequests = await adoptionRequestsModel.readUserAdoptionRequestsModel(req.params.userId);
        res.send({
            success: true,
            data: userAdoptionRequests
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function addAdoptionRequest(req, res) {
    try {
        const newAdoptionRequest = req.body;
        const newRegister = await adoptionRequestsModel.addAdoptionRequestModel(newAdoptionRequest);
        res.send({ success: true, newRegister });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function editAdoptionRequest(req, res) {
    try {
        const updatedAdoptionRequest = req.body;
        const updated = await adoptionRequestsModel.editAdoptionRequestModel(req.params.adoptionRequestId, updatedAdoptionRequest);
        res.send(updated);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function deleteAdoptionRequest(req, res) {
    try {
        const deleted = await adoptionRequestsModel.deleteAdoptionRequestModel(req.params.adoptionRequestId);
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
    getAdoptionRequests,
    getAdoptionRequest,
    getUserAdoptionRequests,
    addAdoptionRequest,
    editAdoptionRequest,
    deleteAdoptionRequest
};