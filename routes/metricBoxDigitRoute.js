const express = require('express');
const router = express.Router();
const middleware = require('../middlewares/middleware.js');

const metricBoxDigitController = require('../controllers/users/metricBoxDigit.controller.js');

router.get('/metric-box-digit',
	middleware.verify,
	metricBoxDigitController.getDigitDataController);

router.post('/metric-box-digit',
	middleware.verify,
	metricBoxDigitController.addDigitDataController);

router.post('/metric-box-digit/:dataID',
	middleware.verify,
	metricBoxDigitController.updateDigitDataController);

router.delete('/metric-box-digit/:dataID',
	middleware.verify,
	metricBoxDigitController.updateDigitDataController);

module.exports = router;
