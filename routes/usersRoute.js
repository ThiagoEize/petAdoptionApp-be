const express = require('express');
const UsersController = require('../controllers/usersController');
const Middleware = require('../middlewares/usersMiddleware');
const GlobalMiddleware = require('../middlewares/usersMiddleware');
const { usersSchema } = require('../schemas/usersSchema');

const router = express.Router();

///Add Validation Middleware to POST/PUT routes

router.get('/', UsersController.getUsers);

router.get('/:userId', UsersController.getUser);

router.post('/',
    GlobalMiddleware.validateBody(usersSchema),
    Middleware.checkIfUserExists,
    UsersController.addUser
);

router.put('/:userId',
    GlobalMiddleware.validateBody(usersSchema),
    UsersController.editUser
);

router.delete('/:userId', UsersController.deleteUser);

module.exports = router;