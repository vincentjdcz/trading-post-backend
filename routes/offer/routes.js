const express = require('express');
const { createOffer, getAllOffersForPost, getOffer } = require('../../controllers/offer/controller');
const router = express.Router();

router.post('/createOffer', createOffer);
router.get('/getAllOffersForPost/:postId', getAllOffersForPost);
router.get('/getOffer/:offerId', getOffer);
module.exports = router;