const mongoose = require('mongoose');
const Joi = require('joi');
const jwt = require('jsonwebtoken');

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

userSchema.methods.generateAuthToken = function() {
	const token = jwt.sign({ _id: this._id }, process.env.jwtPrivateKey);
	return token;
}

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