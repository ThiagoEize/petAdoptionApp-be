const Ajv = require('ajv');
const ajv = new Ajv();
const AdoptionRequestsModel = require('../models/adoptionRequestsModel');

const isValidId = async (req, res, next) => {
    const { adoptionRequestId } = req.params;
    const adoptionRequest = await AdoptionRequestsModel.readAdoptionRequestModel(adoptionRequestId);
    if (!adoptionRequest) {
        res.status(400).send('There is no existing adoption request selected');
        return;
    }
    next();
}

const isNewAdoptionRequest = async (req, res, next) => {
    const { adoptionRequestId } = req.params;
    const { userId, petId } = req.body;
    const adoptionRequest = await AdoptionRequestsModel.isNewAdoptionRequestModel(userId, petId, adoptionRequestId);
    if (adoptionRequest) {
        res.status(400).send('Pet already adopted');
        return;
    }
    next();
};

module.exports = { isNewAdoptionRequest, isValidId };