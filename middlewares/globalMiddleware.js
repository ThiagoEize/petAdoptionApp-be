const Ajv = require('ajv');
const ajv = new Ajv();
const jwt = require('jsonwebtoken');
const PermissionsModel = require('../models/permissionsModel');

function validateBody(schema) {
    return (req, res, next) => {
        // console.log('that is the request', req);
        console.log('that is the req body', req.body);
        // console.log('schema', schema);
        // if () {

        // }
        const valid = ajv.validate(schema, req.body);
        if (!valid) {
            res.status(400).send(ajv.errors[0].message);
            return;
        }
        next();
    };
}

const auth = async (req, res, next) => {
    console.log('This is my auth', req.headers.authorization);
    if (!req.headers.authorization) {
        res.status(401).send('Authorization headers required');
        return;
    }
    const token = req.headers.authorization.replace('Bearer ', '');
    jwt.verify(token, process.env.TOKEN_SECRET, async (err, decoded) => {
        if (err) {
            // console.log(res)
            res.status(401).send('Unauthorized');
            return;
        }

        if (decoded) {
            const permissions = await PermissionsModel.readUserPermissionModel(decoded.id)
            req.permissions = permissions
            permissions.canEditCreateAdmins = permissions.canEditCreateAdmins === 1
            permissions.canEditUserPermissions = permissions.canEditUserPermissions === 1
            permissions.canAcceptAdoptionRequests = permissions.canAcceptAdoptionRequests === 1
            permissions.canFosterPets = permissions.canFosterPets === 1
            permissions.canAdoptPets = permissions.canAdoptPets === 1
            next();
        }
    });
};

module.exports = { validateBody, auth };