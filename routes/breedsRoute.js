const express = require('express');
const BreedsController = require('../controllers/breedsController');
const Middleware = require('../middlewares/breedsMiddleware');
const GlobalMiddleware = require('../middlewares/globalMiddleware');
const { breedsSchema } = require('../schemas/breedsSchema');

const router = express.Router();

///Add Validation Middleware to POST/PUT routes

router.get('/',
    BreedsController.getBreeds,
);

router.get('/:breedId',
    GlobalMiddleware.auth,
    BreedsController.getBreed
);

router.post('/',
    GlobalMiddleware.validateBody(breedsSchema),
    GlobalMiddleware.auth,
    Middleware.isNewBreed,
    BreedsController.addBreed
);

router.put('/:breedId',
    GlobalMiddleware.validateBody(breedsSchema),
    GlobalMiddleware.auth,
    Middleware.isValidId,
    Middleware.isNewBreed,
    BreedsController.editBreed
);

router.delete('/:breedId',
    GlobalMiddleware.auth,
    BreedsController.deleteBreed
);

module.exports = router;