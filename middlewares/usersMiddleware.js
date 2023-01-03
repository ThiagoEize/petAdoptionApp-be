const Ajv = require('ajv');
const ajv = new Ajv();
const { doesUserExistModel } = require('../models/usersModel');


function checkIfUserExists(req, res, next) {
    const { email } = req.body;
    const user = doesUserExistModel(email);

    if (!user) {
        res.status(400).send('User with this email does not exist');
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
