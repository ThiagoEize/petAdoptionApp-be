const dbConnection = require('../knex/knex')

async function readAllUsersModel(query) {
    try {
        const usersList = await dbConnection.from('users')
            .leftJoin('permissions', 'permissions.id', '=', 'users.permissionId')
            .select('users.*', 'permissions.permissionName as permissionName')
            .where(query)
        return usersList
    } catch (err) {
        console.log(err);
    }
}

const getUserByEmailModel = async (email) => {
    try {
        const user = await dbConnection.from('users')
            .leftJoin('permissions', 'permissions.id', '=', 'users.permissionId')
            .select('users.*', 'permissions.permissionName as permissionName')
            .where({ email: email })
            .first()
        return user
    } catch (err) {
        console.log(err);
    }
};

const getUserByNameModel = async (name) => {
    try {
        const user = await dbConnection.from('users')
            .leftJoin('permissions', 'permissions.id', '=', 'users.permissionId')
            .select('users.*', 'permissions.permissionName as permissionName')
            .where({ userName: name })
            .first()
        return user
    } catch (err) {
        console.log(err);
    }
};

async function readUserModel(userId) {
    try {
        const user = await dbConnection
            .from('users')
            .leftJoin('permissions', 'permissions.id', '=', 'users.permissionId')
            .select('users.*', 'permissions.permissionName')
            .where({ 'users.id': userId })
            .first()
        console.log('readUserModel', user)
        return user
    } catch (err) {
        console.log(err);
    }
}

async function addUserModel(newUser) {
    try {
        const [id] = await dbConnection('users')
            .insert(newUser)
        const newRegister = await readUserModel(id)

        return newRegister
    } catch (err) {
        console.log(err);
    }
}

async function editUserModel(userId, updatedUser) {
    try {
        const updated = await dbConnection.from('users')
            .where({ id: userId })
            .update(updatedUser)


        const updatedRegister = await readUserModel(userId)
        return updatedRegister

    } catch (err) {
        console.log(err);
    }
}

async function deleteUserModel(userId) {
    try {
        const deleted = await dbConnection.from('users').where({ id: userId }).del()
        return deleted
    } catch (err) {
        console.log(err);
    }
}

async function doesUserExistModel(email) {
    try {
        const user = await dbConnection.from('users').where({
            email: email
        }).first()
        return user
    } catch (err) {
        console.log(err);
    }
}

module.exports = {
    readAllUsersModel,
    readUserModel,
    addUserModel,
    doesUserExistModel,
    editUserModel,
    deleteUserModel,
    getUserByEmailModel,
    getUserByNameModel
};