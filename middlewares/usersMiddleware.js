const Ajv = require('ajv');
const ajv = new Ajv();
const UsersModel = require('../models/usersModel');


function checkIfUserExists(req, res, next) {
    const { email } = req.body;
    const user = UsersModel.doesUserExistModel(email);

    if (!user) {
        res.status(400).send('User with this email does not exist');
        return;
    }

    next();
}

const isValidId = async (req, res, next) => {
    const { userId } = req.params;
    const user = await UsersModel.readUserModel(userId);
    console.log(user);
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

module.exports = { checkIfUserExists, isValidId, isNewUser };
