const express = require('express');
const { createTrade, getTradesForUser } = require('../../controllers/trade/controller');

const router = express.Router();

router.post('/createTrade', createTrade);
router.get('/getTradesForUser/:userName', getTradesForUser)
module.exports = router;