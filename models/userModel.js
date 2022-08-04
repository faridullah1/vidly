const mongoose = require('mongoose');
const Joi = require('joi');

const userSchema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3,
		maxlength: 50
	},
	email: {
		type: String,
		required: true,
		unique: true,
		minlength: 5,
		maxlength: 255
	},
	password: {
		type: String,
		required: true,
		minlength: 10
	}
});

const User = mongoose.model('User', userSchema);

function validateUser(user) {
	const schema = Joi.object({
		name: Joi.string().min(3).max(50).required(),
		email: Joi.string().email().min(5).max(255).required(),
		password: Joi.string().min(10).required()
	});

	return schema.validate(user);
}

exports.User = User;
exports.validate = validateUser;