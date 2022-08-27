const express = require('express');
const router = express.Router();
const returnsController = require('../controllers/returnsController');

router.route('/').post(returnsController.createRental);

module.exports = router;