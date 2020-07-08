const express = require('express');
const router = express.Router();
const authRoute = require('./authRoute.js');
const processImageRoute = require('./processImageRoute');
const metricBoxDigitRoute = require('./metricBoxDigitRoute');

const viewRoute = require('./viewRoute');

router.use('/', viewRoute);

router.use('/api/auth', authRoute);

router.use('/api/process-image', processImageRoute);

router.use('/api/metric-box-digit', metricBoxDigitRoute);

module.exports = router;
