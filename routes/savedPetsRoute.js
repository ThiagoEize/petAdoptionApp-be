const express = require('express');
const SavedPetsController = require('../controllers/savedPetsController');
const Middleware = require('../middlewares/savedPetsMiddleware');
const GlobalMiddleware = require('../middlewares/globalMiddleware');
const { savedPetsSchema } = require('../schemas/savedPetsSchema');

const router = express.Router();

router.get('/',
    GlobalMiddleware.auth,
    Middleware.canAcess,
    SavedPetsController.getSavedPets
);
router.get('/:savedPetId',
    GlobalMiddleware.auth,
    Middleware.canAcess,
    SavedPetsController.getSavedPet
);
router.post('/',
    GlobalMiddleware.validateBody(savedPetsSchema),
    GlobalMiddleware.auth,
    Middleware.canModify,
    Middleware.isNewSavedPet,
    SavedPetsController.addSavedPet
);
router.put('/:savedPetId',
    GlobalMiddleware.validateBody(savedPetsSchema),
    GlobalMiddleware.auth,
    Middleware.canModify,
    Middleware.isValidId,
    Middleware.isNewSavedPet,
    SavedPetsController.editSavedPet
);
router.delete('/:savedPetId',
    GlobalMiddleware.auth,
    Middleware.canModify,
    SavedPetsController.deleteSavedPet
);

module.exports = router;