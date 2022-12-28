const Ajv = require('ajv');
const ajv = new Ajv();
const { doesPetExistModel } = require('../models/petsModels');


function checkIfPetExists(req, res, next) {
    const { typeId, petName, breedId, color, petBio } = req.body;
    const pet = doesPetExistModel(typeId, breedId, petName, color, petBio);

    if (pet) {
        res.status(400).send('Pet already exists');
        return;
    }

    next();
}

function validateBody(schema) {
    return (req, res, next) => {
        const valid = ajv.validate(schema, req.body);
        if (!valid) {
            res.status(400).send(ajv.errors[0].message);
            return;
        }
        next();
    };
}

module.exports = { checkIfPetExists, validateBody };
