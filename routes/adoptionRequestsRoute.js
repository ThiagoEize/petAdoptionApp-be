const express = require('express');
const AdoptionRequestsController = require('../controllers/adoptionRequestsController');
const Middleware = require('../middlewares/adoptionRequestsMiddleware');
const GlobalMiddleware = require('../middlewares/globalMiddleware');
const { adoptionRequestsSchema } = require('../schemas/adoptionRequestsSchema');

const router = express.Router();

router.get('/',
    GlobalMiddleware.auth,
    AdoptionRequestsController.getAdoptionRequests
);
router.get('/:adoptionRequestId',
    GlobalMiddleware.auth,
    AdoptionRequestsController.getAdoptionRequest
);
router.post('/',
    GlobalMiddleware.validateBody(adoptionRequestsSchema),
    GlobalMiddleware.auth,
    Middleware.isNewAdoptionRequest,
    AdoptionRequestsController.addAdoptionRequest
);
router.put('/:adoptionRequestId',
    GlobalMiddleware.validateBody(adoptionRequestsSchema),
    GlobalMiddleware.auth,
    Middleware.isValidId,
    Middleware.isNewAdoptionRequest,
    AdoptionRequestsController.editAdoptionRequest);
router.delete('/:adoptionRequestId',
    GlobalMiddleware.auth,
    AdoptionRequestsController.deleteAdoptionRequest
);

module.exports = router;