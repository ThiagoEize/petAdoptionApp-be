const express = require('express');
const UsersController = require('../controllers/usersController');
const Middleware = require('../middlewares/usersMiddleware');
const GlobalMiddleware = require('../middlewares/globalMiddleware');
const { usersSchema } = require('../schemas/usersSchema');

const router = express.Router();

///Add Validation Middleware to POST/PUT routes

router.get('/', UsersController.getUsers);

router.get('/:userId', UsersController.getUser);

router.post('/',
    GlobalMiddleware.validateBody(usersSchema),
    Middleware.isNewUser,
    UsersController.addUser
);

router.put('/:userId',
    GlobalMiddleware.validateBody(usersSchema),
    Middleware.isValidId,
    Middleware.isNewUser,
    UsersController.editUser
);

router.delete('/:userId', UsersController.deleteUser);

module.exports = router;