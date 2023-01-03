const express = require('express');
const PermissionsController = require('../controllers/permissionsController');
// const Middleware = require('../middlewares/permissionsMiddleware');
const { permissionsSchema } = require('../schemas/permissionsSchema');
const GlobalMiddleware = require('../middlewares/usersMiddleware');

const router = express.Router();

///Add Validation Middleware to POST/PUT routes

router.get('/', PermissionsController.getPermissions);

router.get('/:permissionId', PermissionsController.getPermission);

router.post('/',
    GlobalMiddleware.validateBody(permissionsSchema),
    // Middleware.checkIfPermissionExists,
    PermissionsController.addPermission
);

router.put('/:permissionId',
    GlobalMiddleware.validateBody(permissionsSchema),
    PermissionsController.editPermission
);

router.delete('/:permissionId', PermissionsController.deletePermission);

module.exports = router;