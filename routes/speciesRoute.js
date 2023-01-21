const express = require('express');
const SpeciesController = require('../controllers/speciesController');
const Middleware = require('../middlewares/speciesMiddleware');
const GlobalMiddleware = require('../middlewares/globalMiddleware');
const { speciesSchema } = require('../schemas/speciesSchema');

const router = express.Router();

router.get('/',
    GlobalMiddleware.auth,
    Middleware.canAcess,
    SpeciesController.getSpecies
);
router.get('/:specieId',
    GlobalMiddleware.auth,
    Middleware.canAcess,
    SpeciesController.getSpecie
);
router.post('/',
    GlobalMiddleware.validateBody(speciesSchema),
    GlobalMiddleware.auth,
    Middleware.canModify,
    Middleware.isNewSpecie,
    SpeciesController.addSpecie
);
router.put('/:specieId',
    GlobalMiddleware.validateBody(speciesSchema),
    GlobalMiddleware.auth,
    Middleware.canModify,
    Middleware.isValidId,
    Middleware.isNewSpecie,
    SpeciesController.editSpecie
);
router.delete('/:specieId',
    GlobalMiddleware.auth,
    Middleware.canModify,
    SpeciesController.deleteSpecie
);
module.exports = router;