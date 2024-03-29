const _ = require('lodash');
const bcrypt = require('bcrypt');
const { User, validate } = require('../models/userModel');

exports.getLoggedInUser = async (req, res) => {
	const user = await User.findById(req.user._id).select('-password');
	res.status(200).send(user);
}

exports.getAllUsers = async (req, res) => {
	const users = await User.find().sort('name');
	res.status(200).send(users);
}

exports.getUserById = async (req, res) => {
	const user = await User.findById(req.params.id);

	if (!user) return res.status(404).send('User with the given ID was not found.');

	res.status(200).send(user);
};

exports.createUser = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.message);

	let user = await User.findOne({ email: req.body.email });
	if (user) return res.status(400).send('User already registered.');

	user = new User(_.pick(req.body, ['name', 'email', 'password']));
	const salt = await bcrypt.genSalt(10);
	user.password = await bcrypt.hash(user.password, salt);

	await user.save();

	const token = user.generateAuthToken();
	res.setHeader('x-auth-token', token);
	res.setHeader('access-control-expose-headers', 'x-auth-token');

	res.status(200).send(_.pick(user, ['_id', 'name', 'email']));
}

exports.updateUser = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.message);

	const user = await User.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	});

	res.status(200).send(user);
};

exports.deleteUser = async (req, res) => {
	const user = await User.findByIdAndRemove(req.params.id);

	if (!user) return res.status(404).send('User with the given ID was not found.');

	res.status(204).send(user);
};