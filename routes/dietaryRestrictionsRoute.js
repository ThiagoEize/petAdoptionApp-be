const express = require('express');
const DietaryRestrictionsController = require('../controllers/dietaryRestrictionsController');
const Middleware = require('../middlewares/dietaryRestrictionsMiddleware');
const GlobalMiddleware = require('../middlewares/globalMiddleware');
const { dietaryRestrictionsSchema } = require('../schemas/dietaryRestrictionsSchema');

const router = express.Router();

///Add Validation Middleware to POST/PUT routes

router.get('/',
    GlobalMiddleware.auth,
    DietaryRestrictionsController.getDietaryRestrictions,
);

router.get('/:dietaryRestrictionId',
    GlobalMiddleware.auth,
    DietaryRestrictionsController.getDietaryRestriction
);

router.post('/',
    GlobalMiddleware.validateBody(dietaryRestrictionsSchema),
    GlobalMiddleware.auth,
    Middleware.isNewDietaryRestriction,
    DietaryRestrictionsController.addDietaryRestriction
);

router.put('/:dietaryRestrictionId',
    GlobalMiddleware.validateBody(dietaryRestrictionsSchema),
    GlobalMiddleware.auth,
    Middleware.isValidId,
    Middleware.isNewDietaryRestriction,
    DietaryRestrictionsController.editDietaryRestriction
);

router.delete('/:dietaryRestrictionId',
    GlobalMiddleware.auth,
    DietaryRestrictionsController.deleteDietaryRestriction
);

module.exports = router;