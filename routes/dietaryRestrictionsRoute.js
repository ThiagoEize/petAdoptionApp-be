const express = require('express');
const DietaryRestrictionsController = require('../controllers/dietaryRestrictionsController');
const Middleware = require('../middlewares/dietaryRestrictionsMiddleware');
const GlobalMiddleware = require('../middlewares/globalMiddleware');
const { dietaryRestrictionsSchema } = require('../schemas/dietaryRestrictionsSchema');

const router = express.Router();

///Add Validation Middleware to POST/PUT routes

router.get('/',
    DietaryRestrictionsController.getDietaryRestrictions,
);

router.get('/:dietaryRestrictionId', DietaryRestrictionsController.getDietaryRestriction);

router.post('/',
    GlobalMiddleware.validateBody(dietaryRestrictionsSchema),
    Middleware.isNewDietaryRestriction,
    DietaryRestrictionsController.addDietaryRestriction
);

router.put('/:dietaryRestrictionId',
    GlobalMiddleware.validateBody(dietaryRestrictionsSchema),
    Middleware.isValidId,
    Middleware.isNewDietaryRestriction,
    DietaryRestrictionsController.editDietaryRestriction
);

router.delete('/:dietaryRestrictionId', DietaryRestrictionsController.deleteDietaryRestriction);

module.exports = router;