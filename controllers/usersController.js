// const { addUserModel, readAllUsersModel, deleteUserModel } = require('../models/usersModels');
const { addUsersModel, readAllUsersModel, readUserModel, deleteUserModel } = require('../models/usersModels');
const { v4: uuidv4 } = require('uuid');

const getUsers = (req, res) => {
    try {
        // const {
        //     user, type, breed, name, adoptionStatus,
        //     minHeight, maxHeight, minWeight,
        //     maxWeight, color, minAge, maxAge
        // } = req.query;
        let where;

        function isNumeric(num) {
            return !isNaN(num)
        }

        for (const key in req.query) {
            where = where + req.query[key] && where ? 'where' : ' and';
            if (isNumeric(req.query[key])) {
                where += ` ${key} like '${req.query[key]}'`;
            } else {
                where += ` ${key} = '%${req.query[key]}%'`;
            }
        }

        const allUsers = readAllUsersModel();
        res.send(allUsers);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const getUser = (req, res) => {
    try {
        const { userId } = req.params;
        const user = readUserModel(userId);
        res.send(user);
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

const addUser = (req, res) => {
    try {
        const newUser = {
            ...req.body,
            id: uuidv4(),
            date: new Date(),
        };
        const userAdded = addUsersModel(newUser);
        if (userAdded) {
            res.send(newUser);
        }
    } catch (err) {
        console.log(err);
        res.status(500).send(err);
    }
}

// const updateUser = (req, res) => {
//     try {
//         const { userId } = req.params;
//         const userUpdated = addUsersModel(userId, ...req.body);
//         if (userUpdated) {
//             res.send(...req.body);
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err);
//     }
// }

function deleteUser(req, res) {
    const { userId } = req.params;
    const deleted = deleteUserModel(userId);
    if (deleted) {
        res.send({ ok: true, deletedId: userId });
    }
}

module.exports = { addUser, getUsers, getUser, deleteUser }