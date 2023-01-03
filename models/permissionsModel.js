const dbConnection = require('../knex/knex')

async function readAllPermissionsModel(query) {
    try {
        const permissionsList = await dbConnection.from('permissions').where(query);
        return permissionsList
    } catch (err) {
        console.log(err);
    }
}

async function readPermissionModel(permissionId) {
    try {
        const permission = await dbConnection
            .from('permissions')
            .where({ id: permissionId })
            .first()
        return permission
    } catch (err) {
        console.log(err);
    }
}

async function addPermissionModel(newPermission) {
    try {
        const [id] = await dbConnection('permissions')
            .insert(newPermission);
        const permissionObj = await readPermissionModel(id);

        return permissionObj;
    } catch (err) {
        console.log(err);
    }
}

async function editPermissionModel(permissionId, updatedPermission) {
    try {
        const updated = await dbConnection('permissions')
            .where({ id: permissionId })
            .update(updatedPermission)


        const updatedRegister = await readPermissionModel(permissionId);
        return updatedRegister;

    } catch (err) {
        console.log(err);
    }
}

async function deletePermissionModel(permissionId) {
    try {
        const deleted = await dbConnection.from('permissions').where({ id: permissionId }).del()
        return deleted
    } catch (err) {
        console.log(err);
    }
}

async function readUserPermissionsModel(userId) {
    try {
        const permissionsList = await dbConnection('permissions')
            .join('users_permissions', 'permissions.id', 'users_permissions.permission_id')
            .where('users_permissions.user_id', userId)
            .select('permissions.name', 'permissions.description')
        return permissionsList
    } catch (err) {
        console.log(err);
    }
}

module.exports = { readAllPermissionsModel, readPermissionModel, addPermissionModel, editPermissionModel, deletePermissionModel, readUserPermissionsModel };