const Ajv = require('ajv');
const ajv = new Ajv();
const UsersModel = require('../models/usersModel');
const PermissionsModel = require('../models/permissionsModel');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
require('dotenv').config();
// const cookieParser = require('cookie-parser');
// app.use(cookieParser());

function passwordsMatch(req, res, next) {
    if (req.body.password !== req.body.repassword) {
        res.status(400).send("Passwords dont match");
        return;
    }
    delete req.body.repassword;
    // const {repasword, ...rest} = req.body
    // req.body = rest
    next();
}

function hashPwd(req, res, next) {
    const saltRounds = 10;
    bcrypt.hash(req.body.password, saltRounds, (err, hash) => {
        if (err) {
            res.status(500).send(err.message);
            return;
        }
        req.body.password = hash;
        // console.log(hash);
        next();
    });
}

const isValidId = async (req, res, next) => {
    const { userId } = req.params;
    const user = await UsersModel.readUserModel(userId);
    // console.log(user);
    if (!user) {
        res.status(400).send('There is existing user with selected');
        return;
    }
    next();
}

const isNewUser = async (req, res, next) => {
    const { userId } = req.params;
    const { email } = req.body;
    const user = await UsersModel.isNewUserModel(email, userId);
    if (user) {
        res.status(400).send('User already exists');
        return;
    }
    next();
};

const checkIfUserExists = async (req, res, next) => {
    try {
        const { email } = req.body;
        const user = await UsersModel.doesUserExistModel(email);
        console.log(req.body);
        if (!user) {
            res.status(400).send('User with this email does not exist');
            return;
        }
        req.body.user = user;
        next();
    } catch (err) {
        console.log(err);
    }
}

async function verifyPassword(req, res, next) {
    try {
        const { user, password } = req.body;
        bcrypt.compare(password, user.password, (err, result) => {
            if (result) {
                const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: "12h" });
                req.body.token = token;
                console.log('vfp token', token);
                // console.log(token);
                next();
            } else {
                res.status(400).send("Incorrect Password");
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
    // try {
    //     const { user, token } = req.body;
    //     res.cookie('token', token, { maxAge: 86000000, httpOnly: true });
    //     res.send({ name: user.name, id: user.id, });
    // } catch (err) {
    //     res.status(500).send(err);
    // }
}

async function givingUserPermission(req, res, next) {
    try {
        // Check if a permission called 'user' exists
        const userPermission = await PermissionsModel.readAllPermissionsModel({ permissionName: 'user' });
        console.log('test userPermission', userPermission);
        if (userPermission.length > 0) {
            req.body.permissionId = userPermission[0].id;
            console.log('signin login:', req.body);
            next();
        } else {
            const newPermission = {
                permissionName: 'user',
                canEditCreateAdmins: false,
                canEditUsersPermissions: false,
                canAcceptAdoptionRequests: false,
                canAdoptFosterPets: true,
                canAdoptPets: true
            };

            const createdPermission = await PermissionsModel.addPermissionModel(newPermission);
            req.body.permissionId = createdPermission.id;
            console.log('signin login:', req.body);
            next();
        }
    } catch (err) {
        console.log(err);
    }
}
module.exports = {
    passwordsMatch,
    hashPwd,
    checkIfUserExists,
    isValidId,
    isNewUser,
    verifyPassword,
    givingUserPermission
};