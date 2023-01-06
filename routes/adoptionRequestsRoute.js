const express = require('express');
const AdoptionRequestsController = require('../controllers/adoptionRequestsController');
const Middleware = require('../middlewares/adoptionRequestsMiddleware');
const GlobalMiddleware = require('../middlewares/globalMiddleware');
const { adoptionRequestsSchema } = require('../schemas/adoptionRequestsSchema');

const router = express.Router();

router.get('/', AdoptionRequestsController.getAdoptionRequests);
router.get('/:adoptionRequestId', AdoptionRequestsController.getAdoptionRequest);
router.post('/',
    GlobalMiddleware.validateBody(adoptionRequestsSchema),
    Middleware.isNewAdoptionRequest,
    AdoptionRequestsController.addAdoptionRequest);
router.put('/:adoptionRequestId',
    GlobalMiddleware.validateBody(adoptionRequestsSchema),
    Middleware.isValidId,
    Middleware.isNewAdoptionRequest,
    AdoptionRequestsController.editAdoptionRequest);
router.delete('/:adoptionRequestId', AdoptionRequestsController.deleteAdoptionRequest);

module.exports = router;