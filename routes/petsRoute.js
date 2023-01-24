const express = require('express');
const PetsController = require('../controllers/petsController');
const Middleware = require('../middlewares/petsMiddleware');
const GlobalMiddleware = require('../middlewares/globalMiddleware');
const { petsSchema } = require('../schemas/petsSchema');

const router = express.Router();

///Add Validation Middleware to POST/PUT routes

router.get('/',
    GlobalMiddleware.auth,
    Middleware.canAcess,
    PetsController.getPets
);

router.get('/myPets',
    GlobalMiddleware.auth,
    Middleware.canAcess,
    PetsController.getMyPets
);

// router.get('/:userId',
//     GlobalMiddleware.auth,
//     PetsController.getUserPets
// );

router.get('/:petId',
    GlobalMiddleware.auth,
    Middleware.canAcess,
    PetsController.getPet
);

router.post('/',
    GlobalMiddleware.auth,
    Middleware.canModify,
    Middleware.isNewPet,
    Middleware.upload.single('picture'),
    Middleware.fixRequest,
    GlobalMiddleware.validateBody(petsSchema),
    PetsController.addPet
);

router.put('/:petId',
    GlobalMiddleware.auth,
    Middleware.canModify,
    Middleware.isNewPet,
    Middleware.upload.single('picture'),
    Middleware.fixRequest,
    GlobalMiddleware.validateBody(petsSchema),
    Middleware.isValidId,
    PetsController.editPet
);

router.put('/aprove/:petId',
    GlobalMiddleware.auth,
    Middleware.canModify,
    Middleware.isValidId,
    PetsController.aprovedAdoption
);

router.delete('/:petId',
    GlobalMiddleware.auth,
    Middleware.canModify,
    PetsController.deletePet
);

module.exports = router;