const express = require('express');
const PetsController = require('../controllers/petsController');
const Middleware = require('../middlewares/petsMiddleware');
const GlobalMiddleware = require('../middlewares/globalMiddleware');
const { petsSchema } = require('../schemas/petsSchema');

const router = express.Router();

///Add Validation Middleware to POST/PUT routes

router.get('/',
    GlobalMiddleware.auth,
    PetsController.getPets
);

router.get('/:userId',
    GlobalMiddleware.auth,
    PetsController.getUserPets
);

router.get('/:petId',
    GlobalMiddleware.auth, PetsController.getPet
);

router.post('/',
    GlobalMiddleware.auth,
    Middleware.isNewPet,
    Middleware.upload.single('picture'),
    Middleware.fixRequest,
    GlobalMiddleware.validateBody(petsSchema),
    PetsController.addPet
);

router.put('/:petId',
    GlobalMiddleware.validateBody(petsSchema),
    GlobalMiddleware.auth,
    Middleware.isValidId,
    Middleware.isNewPet,
    PetsController.editPet
);

router.delete('/:petId',
    GlobalMiddleware.auth,
    PetsController.deletePet
);

module.exports = router;