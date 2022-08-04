const bcrypt = require('bcrypt');
const Joi = require('joi');
const { User } = require('../models/userModel');


exports.login = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.message);

	let user = await User.findOne({ email: req.body.email });
	if (!user) return res.status(400).send('Invalid email or password.');

	const isValid = await bcrypt.compare(req.body.password, user.password);
	if (!isValid) return res.status(400).send('Invalid email or password.');

	res.status(200).send(true);
}

function validate(req) {
	const schema = Joi.object({
		email: Joi.string().email().min(5).max(255).required(),
		password: Joi.string().min(10).required()
	});

	return schema.validate(req); 
}