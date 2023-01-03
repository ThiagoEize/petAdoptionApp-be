const UsersModel = require('../models/usersModel');

const getUsers = async (req, res) => {
    try {
        const query = req.query;
        const allUsers = await UsersModel.readAllUsersModel(query);
        console.log(allUsers)
        res.send({
            success: true,
            data: allUsers
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const getUser = async (req, res) => {
    try {
        const { userId } = req.params;
        const user = await UsersModel.readUserModel(userId);
        res.send({
            success: true,
            data: user
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const addUser = async (req, res) => {
    try {
        const newUser = req.body;
        const userAdded = await UsersModel.addUserModel(newUser);
        console.log(userAdded)
        if (userAdded) {
            res.send(newUser);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const editUser = async (req, res) => {
    try {
        const updatedUser = req.body;
        const updated = await UsersModel.editUserModel(req.params.userId, updatedUser);
        res.send({
            success: true,
            data: updated
        });
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

async function deleteUser(req, res) {
    const { userId } = req.params;
    const deleted = await UsersModel.deleteUserModel(userId);
    if (deleted) {
        res.send({ ok: true, deletedId: userId });
    }
}

module.exports = { addUser, getUsers, getUser, editUser, deleteUser }