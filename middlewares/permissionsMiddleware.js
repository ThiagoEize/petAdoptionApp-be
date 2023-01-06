const Ajv = require('ajv');
const ajv = new Ajv();
const PermissionsModel = require('../models/permissionsModel');

const isValidId = async (req, res, next) => {
    const { permissionId } = req.params;
    const permission = await PermissionsModel.readPermissionModel(permissionId);
    if (!permission) {
        res.status(400).send('There is no existing permission selected');
        return;
    }
    next();
}

const isNewPermission = async (req, res, next) => {
    const { permissionId } = req.params;
    const { permissionName } = req.body;
    const permission = await PermissionsModel.isNewPermissionModel(permissionName, permissionId);
    if (permission) {
        res.status(400).send('Permission already exists');
        return;
    }
    next();
};

module.exports = { isNewPermission, isValidId };