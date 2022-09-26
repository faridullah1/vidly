const express = require('express');
const router = express.Router();
const rentalController = require('../controllers/rentalController');
const { auth } = require('../middleware/auth');

router.route('/')
	.get(rentalController.getAllRentals)
	.post(auth, rentalController.createRental);

router.route('/:id')
	.get(rentalController.getRentalById);

module.exports = router;