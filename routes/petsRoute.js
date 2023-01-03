const express = require('express');
const PetsController = require('../controllers/petsController');
const Middleware = require('../middlewares/petsMiddleware');
const GlobalMiddleware = require('../middlewares/globalMiddleware');
const { petsSchema } = require('../schemas/petsSchema');

const router = express.Router();

///Add Validation Middleware to POST/PUT routes

router.get('/', PetsController.getPets);

router.get('/user/:userId', PetsController.getUserPets);

router.get('/:petId', PetsController.getPet);

router.post('/',
    GlobalMiddleware.validateBody(petsSchema),
    Middleware.isNewPet,
    PetsController.addPet
);

router.put('/:petId',
    GlobalMiddleware.validateBody(petsSchema),
    Middleware.isNewPet,
    PetsController.editPet
);

router.delete('/:petId', PetsController.deletePet);

module.exports = router;