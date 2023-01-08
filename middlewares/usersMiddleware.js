const Ajv = require('ajv');
const ajv = new Ajv();
const UsersModel = require('../models/usersModel');

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
        next();
    });
}


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

module.exports = { passwordsMatch, hashPwd, checkIfUserExists, isValidId, isNewUser };
