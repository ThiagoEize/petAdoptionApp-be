const express = require('express');
const PetsController = require('../controllers/petsController');
const Middlewares = require('../middlewares/petsMiddlewares');
const { petsSchema } = require('../schemas/petsSchema');

const router = express.Router();

///Add Validation Middleware to POST/PUT routes

router.get('/', PetsController.getPets);

router.get('/:petId', PetsController.getPet);

router.post('/',
    Middlewares.validateBody(petsSchema),
    Middlewares.checkIfPetExists,
    PetsController.addPet
);

router.delete('/:petId', PetsController.deletePet);

module.exports = router;