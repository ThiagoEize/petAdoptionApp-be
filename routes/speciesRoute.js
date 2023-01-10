const express = require('express');
const SpeciesController = require('../controllers/speciesController');
const Middleware = require('../middlewares/speciesMiddleware');
const GlobalMiddleware = require('../middlewares/globalMiddleware');
const { speciesSchema } = require('../schemas/speciesSchema');

const router = express.Router();

router.get('/', SpeciesController.getSpecies);
router.get('/:specieId', SpeciesController.getSpecie);
router.post('/',
    GlobalMiddleware.validateBody(speciesSchema),
    GlobalMiddleware.auth,
    Middleware.isNewSpecie,
    SpeciesController.addSpecie
);
router.put('/:specieId',
    GlobalMiddleware.auth,
    GlobalMiddleware.validateBody(speciesSchema),
    Middleware.isValidId,
    Middleware.isNewSpecie,
    SpeciesController.editSpecie
);
router.delete('/:specieId', SpeciesController.deleteSpecie);

module.exports = router;