const express = require('express');
const PermissionsController = require('../controllers/permissionsController');
// const Middleware = require('../middlewares/permissionsMiddleware');
const { permissionsSchema } = require('../schemas/permissionsSchema');
const GlobalMiddleware = require('../middlewares/globalMiddleware');
const Middleware = require('../middlewares/permissionsMiddleware');


const router = express.Router();

///Add Validation Middleware to POST/PUT routes

router.get('/',
    GlobalMiddleware.auth,
    PermissionsController.getPermissions
);

router.get('/:permissionId', GlobalMiddleware.auth,
    PermissionsController.getPermission
);

router.post('/',
    GlobalMiddleware.validateBody(permissionsSchema),
    GlobalMiddleware.auth,
    Middleware.isNewPermission,
    PermissionsController.addPermission
);

router.put('/:permissionId',
    GlobalMiddleware.validateBody(permissionsSchema),
    GlobalMiddleware.auth,
    Middleware.isValidId,
    Middleware.isNewPermission,
    PermissionsController.editPermission
);

router.delete('/:permissionId',
    GlobalMiddleware.auth,
    PermissionsController.deletePermission
);

module.exports = router;