const express = require('express');
const SavedPetsController = require('../controllers/savedPetsController');
const Middleware = require('../middlewares/savedPetsMiddleware');
const GlobalMiddleware = require('../middlewares/globalMiddleware');
const { savedPetsSchema } = require('../schemas/savedPetsSchema');

const router = express.Router();

router.get('/', SavedPetsController.getSavedPets);
router.get('/:savedPetId', SavedPetsController.getSavedPet);
router.post('/',
    GlobalMiddleware.validateBody(savedPetsSchema),
    Middleware.isNewSavedPet,
    SavedPetsController.addSavedPet);
router.put('/:savedPetId',
    GlobalMiddleware.validateBody(savedPetsSchema),
    Middleware.isNewSavedPet,
    SavedPetsController.editSavedPet);
router.delete('/:savedPetId', SavedPetsController.deleteSavedPet);

module.exports = router;