const { Genre } = require('../models/genreModel');
const { Movie, validate } = require('../models/movieModel');

exports.getAllMovies = async (req, res) => {
	const moview = await Movie.find().sort('title');
	res.status(200).send(moview);
}

exports.getMovieById = async (req, res) => {
	const movie = await Movie.findById(req.params.id);

	if (!movie) return res.status(404).send('Movie with the given ID was not found.');

	res.status(200).send(movie);
};

exports.createMovie = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.message);

	const genre = await Genre.findById(req.body.genreId);
	if (!genre) return res.status(400).send('Invalid genre!');

	let movie = new Movie({
		title: req.body.title,
		genre: {
			_id: genre._id,
			name: genre.name
		},
		numberInStock: req.body.numberInStock,
		dailyRentalRate: req.body.dailyRentalRate
	});

	movie = await movie.save();

	res.status(200).send(movie);
}

exports.updateMovie = async (req, res) => {
	const { error } = validate(req.body);
	if (error) return res.status(400).send(error.message);

	const genre = await Genre.findById(req.body.genreId);
	if (!genre) return res.status(400).send('Invalid genre!');

	const movie = await Movie.findByIdAndUpdate(req.params.id, {
		title: req.body.title,
		genre: {
			_id: genre._id,
			name: genre.name
		},
		numberInStock: req.body.numberInStock,
		dailyRentalRate: req.body.dailyRentalRate
	}, {
		new: true
	});

	res.status(200).send(movie);
};

exports.deleteMovie = async (req, res) => {
	const movie = await Movie.findByIdAndRemove(req.params.id);

	if (!movie) return res.status(404).send('Movie with the given ID was not found.');

	res.status(204).send(movie);
};