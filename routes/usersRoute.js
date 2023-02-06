const express = require('express');
const UsersController = require('../controllers/usersController');
const Middleware = require('../middlewares/usersMiddleware');
const GlobalMiddleware = require('../middlewares/globalMiddleware');
const { usersSchema } = require('../schemas/usersSchema');
const { userLoginsSchema } = require('../schemas/userLoginsSchema');

const router = express.Router();

///Add Validation Middleware to POST/PUT routes

router.get('/',
    GlobalMiddleware.auth,
    UsersController.getUsers
);

router.get('/:userId',
    GlobalMiddleware.auth,
    UsersController.getUser
);

router.post('/login',
    GlobalMiddleware.validateBody(userLoginsSchema),
    Middleware.checkIfUserExists,
    Middleware.verifyPassword,
    UsersController.login
);

router.post('/signup',
    GlobalMiddleware.validateBody(usersSchema),
    Middleware.isNewUser,
    Middleware.passwordsMatch,
    Middleware.hashPwd,
    Middleware.givingUserPermission,
    UsersController.signup
);

router.put('/:userId',
    GlobalMiddleware.validateBody(usersSchema),
    GlobalMiddleware.auth,
    Middleware.isValidId,
    Middleware.isNewUser,
    UsersController.editUser
);

router.delete('user/:userId', UsersController.deleteUser);

module.exports = router;