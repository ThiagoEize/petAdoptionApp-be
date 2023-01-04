const Ajv = require('ajv');
const ajv = new Ajv();
const AdoptionRequestsModel = require('../models/adoptionRequestsModel');

const isNewAdoptionRequest = async (req, res, next) => {
    const { adoptionRequestId } = req.params;
    const { userId, petId } = req.body;
    const adoptionRequest = await AdoptionRequestsModel.isNewAdoptionRequestModel(userId, petId, adoptionRequestId);
    if (adoptionRequest) {
        res.status(400).send('Pet already saved');
        return;
    }
    next();
};

module.exports = { isNewAdoptionRequest };