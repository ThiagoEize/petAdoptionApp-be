const UsersModel = require('../models/usersModel');

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

const signup = async (req, res) => {
    const { name, email, password } = req.body;
    try {
        const newUser = {
            username: name,
            email: email,
            password: password,
        };
        const userId = await UsersModel.addUserModel(newUser);
        res.send({ userId: userId, ok: true });
    } catch (err) {
        res.status(500).send(err);
    }
};

const login = async (req, res) => {
    const { password, user } = req.body;
    try {
        bcrypt.compare(password, user.password, (err, result) => {
            if (err) {
                res.status(500).send(err);
            } else if (!result) {
                res.status(400).send("Password don't match");
            } else {
                const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, { expiresIn: '1h' });
                console.log('TOKEN', token);
                res.send({ token: token, username: user.username });
            }
        });
    } catch (err) {
        res.status(500).send(err);
    }
};

module.exports = { addUser, getUsers, getUser, editUser, deleteUser, signup, login }