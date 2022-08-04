const { Customer, validate } = require('../models/customerModel');

exports.getAllCustomers = async (req, res) => {
	const cusotmers = await Customer.find().sort('name');
	res.status(200).send(cusotmers);
}

exports.getCustomerById = async (req, res) => {
	const customer = await Customer.findById(req.params.id);

	if (!customer) return res.status(404).send('Customer with the given ID was not found.');

	res.status(200).send(customer);
};

exports.createCustomer = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.message);

	const customer = new Customer({
		name: req.body.name,
		phone: req.body.phone,
		isGold: req.body.isGold
	});

	await customer.save();

	res.status(200).send(customer);
}

exports.updateCustomer = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.message);

	const customer = await Customer.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	});

	res.status(200).send(customer);
};

exports.deleteCustomer = async (req, res) => {
	const customer = await Customer.findByIdAndRemove(req.params.id);

	if (!customer) return res.status(404).send('Customer with the given ID was not found.');

	res.status(204).send(customer);
};