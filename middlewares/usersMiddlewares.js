const Ajv = require('ajv');
const ajv = new Ajv();
const { doesUserExistModel } = require('../models/usersModels');


function checkIfUserExists(req, res, next) {
    const { userName, userLastName } = req.body;
    const user = doesUserExistModel(userName, userLastName);

    if (user) {
        res.status(400).send('User already exists');
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

module.exports = { checkIfUserExists, validateBody };
