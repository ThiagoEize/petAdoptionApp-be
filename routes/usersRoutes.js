const express = require('express');
const UsersController = require('../controllers/usersController');
const Middlewares = require('../middlewares/usersMiddlewares');
const { usersSchema } = require('../schemas/usersSchema');

const router = express.Router();

///Add Validation Middleware to POST/PUT routes

router.get('/', UsersController.getUsers);

router.get('/:userId', UsersController.getUser);

router.post('/',
    Middlewares.validateBody(usersSchema),
    Middlewares.checkIfUserExists,
    UsersController.addUser
);

router.delete('/:userId', UsersController.deleteUser);

module.exports = router;