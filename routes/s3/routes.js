const { gets3UrlHandler } = require('../../controllers/s3/controller');

const express = require('express');

const router = express.Router();

router.get("/", gets3UrlHandler);
module.exports = router;