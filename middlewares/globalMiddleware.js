const Ajv = require('ajv');
const ajv = new Ajv();
const jwt = require('jsonwebtoken');
const PermissionsModel = require('../models/permissionsModel');

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

const auth = async (req, res, next) => {
    if (!req.headers.authorization) {
        res.status(401).send('Authorization headers required');
        return;
    }
    const token = req.headers.authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            res.status(401).send('Unauthorized');
            return;
        }

        if (decoded) {
            const permissions = await PermissionsModel.readUserPermissionModel(decoded.id)
            permissions.canEditCreateAdmins = permissions.canEditCreateAdmins === 1
            permissions.canEditUserPermissions = permissions.canEditUserPermissions === 1
            permissions.canAcceptAdoptionRequests = permissions.canAcceptAdoptionRequests === 1
            permissions.canFosterPets = permissions.canFosterPets === 1
            permissions.canAdoptPets = permissions.canAdoptPets === 1
            req.permissions = permissions
            req.loggedInUserId = decoded.id
            next();
        }
    });
};

module.exports = { validateBody, auth };