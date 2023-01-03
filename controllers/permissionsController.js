const PermissionsModel = require('../models/permissionsModel');

async function getPermissions(req, res) {
    try {
        const query = req.query;

        const permissions = await PermissionsModel.readAllPermissionsModel(query);
        res.send({
            success: true,
            data: permissions
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function getPermission(req, res) {
    try {
        const permissionId = req.params.permissionId;
        const permission = await PermissionsModel.readPermissionModel(permissionId);
        res.send({
            success: true,
            data: permission
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function addPermission(req, res) {
    try {
        const newPermission = req.body;
        const savedPermission = await PermissionsModel.addPermissionModel(newPermission);
        res.send({
            success: true,
            data: savedPermission
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function editPermission(req, res) {
    try {
        const updatedPermission = req.body;
        const updated = await PermissionsModel.editPermissionModel(req.params.permissionId, updatedPermission);
        res.send({
            success: true,
            data: updated
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function deletePermission(req, res) {
    try {
        const deleted = await PermissionsModel.deletePermissionModel(req.params.permissionId);
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
    getPermissions,
    getPermission,
    addPermission,
    editPermission,
    deletePermission
};