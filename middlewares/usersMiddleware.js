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

module.exports = { checkIfUserExists, isNewUser };
