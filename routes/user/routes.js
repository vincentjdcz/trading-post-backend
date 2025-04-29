const express = require('express');
const { uploadProfilePicture } = require('../../controllers/user/controller');
const router = express.Router();

router.post("/uploadProfilePicture", uploadProfilePicture);

module.exports = router;