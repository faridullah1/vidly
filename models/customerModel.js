const mongoose = require('mongoose');
const Joi = require('joi');

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50
	},
	phone: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50
	},
	isGold: {
		type: Boolean,
		default: false
	}
});

const Customer = mongoose.model('Customer', schema);

function validateCustomer(customer) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(50).required(),
		phone: Joi.string().min(3).max(50).required(),
		isGold: Joi.bool()
	});

	return schema.validate(customer);
}

exports.Customer = Customer;
exports.validate = validateCustomer