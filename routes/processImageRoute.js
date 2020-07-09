const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/middleware.js');

const processImageController = require('../controllers/users/processImage.controller.js');

router.post('/img2digit',
	middleware.verify,
	processImageController.img2digitController);

router.post('/img2digit-mobile',
	middleware.verify,
	processImageController.img2digitMobileController);

module.exports = router
