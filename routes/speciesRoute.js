const express = require('express');
const SpeciesController = require('../controllers/speciesController');
const GlobalMiddleware = require('../middlewares/usersMiddleware');
const { speciesSchema } = require('../schemas/usersSchema');

const router = express.Router();

router.get('/', SpeciesController.getSpecies);
router.get('/:specieId', SpeciesController.getSpecie);
router.post('/', GlobalMiddleware.validateBody(speciesSchema), SpeciesController.addSpecie);
router.put('/:specieId', GlobalMiddleware.validateBody(speciesSchema), SpeciesController.editSpecie);
router.delete('/:specieId', SpeciesController.deleteSpecie);

module.exports = router;