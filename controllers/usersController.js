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

// const addUser = async (req, res) => {
//     try {
//         const newUser = req.body;
//         const userAdded = await UsersModel.addUserModel(newUser);
//         console.log(userAdded)
//         if (userAdded) {
//             res.send(newUser);
//         }
//     } catch (err) {
//         console.log(err);
//         res.status(500).send(err);
//     }
// }

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
    // const { password, user } = req.body;
    // try {
    //     console.log('login', user)
    //     console.log('login', password)
    //     bcrypt.compare(password, user.password, (err, result) => {
    //         if (err) {
    //             res.status(500).send(err);
    //         } else if (!result) {
    //             res.status(400).send("Password don't match");
    //         } else {
    //             const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
    //            
    //             res.send({ token: token, userName: user.userName });
    //         }
    //     });
    // } catch (err) {
    //     res.status(500).send(err);
    // }
    try {
        const { user, token } = req.body;
        res.send({ id: user.id, token: token, success: true });
    } catch (err) {
        res.status(500).send(err);
    }

};

// const login = async (req, res) => {
//     const { password, user } = req.body;
//     try {
//         bcrypt.compare(password, user.password, (err, result) => {
//             if (err) {
//                 res.status(500).send(err);
//             } else if (!result) {
//                 res.status(400).send("Password don't match");
//             } else {
//                 const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
//                 res.cookie('token', token, { maxAge: 86000000, httpOnly: true });
//                 res.send({ ok: true, userId: user.id });
//             }
//         });
//     } catch (err) {
//         res.status(500).send(err);
//     }
// };

module.exports = { getUsers, getUser, editUser, deleteUser, signup, login }