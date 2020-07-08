const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/middleware.js');

const metricBoxDigitController = require('../controllers/users/metricBoxDigit.controller.js');

router.get('/',
	middleware.verify,
	metricBoxDigitController.getDigitDataController);

router.post('/',
	middleware.verify,
	metricBoxDigitController.addDigitDataController);

router.post('/:dataID',
	middleware.verify,
	metricBoxDigitController.updateDigitDataController);

router.delete('/:dataID',
	middleware.verify,
	metricBoxDigitController.updateDigitDataController);

module.exports = router;
