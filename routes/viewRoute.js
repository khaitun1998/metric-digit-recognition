const express = require('express');
const router = express.Router();
const viewController = require('../controllers/view.controller.js');

router.get('/login', viewController.loginView);

router.get('/', viewController.homePage);

router.get('/history', viewController.historyView);

router.get('/upload-img', viewController.uploadImage);

module.exports = router;
