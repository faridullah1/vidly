const express = require('express');
const router = express.Router();
const customerController = require('../controllers/customerController');
const { auth } = require('../middleware/auth');

router.route('/')
	.get(customerController.getAllCustomers)
	.post(auth, customerController.createCustomer);

router.route('/:id')
	.get(customerController.getCustomerById)
	.put(customerController.updateCustomer)
	.delete(customerController.deleteCustomer)

module.exports = router;