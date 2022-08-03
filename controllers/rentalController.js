const { Customer } = require('../models/customerModel');
const { Movie } = require('../models/movieModel');
const { Rental, validate } = require('../models/rentalModel');

exports.getAllRentals = async (req, res) => {
	const rentals = await Rental.find().sort('title');
	res.status(200).send(rentals);
}

exports.getRentalById = async (req, res) => {
	const rental = await Rental.findById(req.params.id);

	if (!rental) return res.status(404).send('Rental with the given ID was not found.');

	res.status(200).send(rental);
};

exports.createRental = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.message);

	const customer = await Customer.findById(req.body.customerId);
	if (!customer) return res.status(400).send('Invalid customer.');

	const movie = await Movie.findById(req.body.movieId);
	if (!movie) return res.status(400).send('Invalid movie.');

	if (movie.numberInStock === 0) return res.status(400).send('Movie not in stock.');

	let rental = new Rental({
		customer: {
			_id: customer._id,
			name: customer.name,
			phone: customer.phone,
			isGold: customer.isGold
		},
		movie: {
			_id: movie._id,
			title: movie.title,
			dailyRentalRate: movie.dailyRentalRate
		}
	});

	rental = await rental.save();

	movie.numberInStock--;
	movie.save();

	res.status(200).send(rental);
}