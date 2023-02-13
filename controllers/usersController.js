const UsersModel = require('../models/usersModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const getUsers = async (req, res) => {
    try {
        const query = req.query;
        const allUsers = await UsersModel.readAllUsersModel(query);

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
        if (user) {
            res.send({
                success: true,
                data: user
            });
        } else {
            res.status(400).send('User does not exist');
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
        console.log('updated', updated);
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

const signup = async (req, res) => {
    try {
        console.log('controller signin:', req.body);
        const user = await UsersModel.addUserModel(req.body);
        res.send({ id: user.id, success: true });
    } catch (err) {
        res.status(500).send(err);
    }
};

const login = async (req, res) => {
    try {
        const { user, token } = req.body;
        res.send({ id: user.id, token: token, success: true });
    } catch (err) {
        res.status(500).send(err);
    }

};

module.exports = { getUsers, getUser, editUser, deleteUser, signup, login }