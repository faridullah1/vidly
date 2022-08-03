const Joi = require('joi');
const Genre = require('../models/genreModel');

exports.getAllGenres = async (req, res) => {
	const genres = await Genre.find();
	res.status(200).send(genres);
}

exports.getGenreById = async (req, res) => {
	const genre = await Genre.findById(req.params.id);

	if (!genre) return res.status(404).send('Genre with the given ID was not found.');

	res.status(200).send(genre);
};

exports.createGenre = async (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.message);

	const genre = new Genre({
		name: req.body.name
	});

	const result = await genre.save();

	res.status(200).send(result);
}

exports.updateGenre = async (req, res) => {
	// Using Query First approach
	
	// const genre = await Genre.findById(req.params.id);
	// if (!genre) return res.status(404).send('Genre with the given ID was not found.');

	// const { error } = validateGenre(req.body);
	// if (error) return res.status(400).send(error.message);

	// genre.name = req.body.name;
	// const result = await genre.save();

	// Using direct approach
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.message);

	const genre = await Genre.findByIdAndUpdate(req.params.id, req.body, {
		new: true
	});

	res.status(200).send(genre);
};

exports.deleteGenre = async (req, res) => {
	// Using query first approach
	// const genre = await Genre.findById(req.params.id);
	// if (!genre) return res.status(404).send('Genre with the given ID was not found.');

	// const result = await genre.deleteOne();

	const genre = await Genre.findByIdAndRemove(req.params.id);

	if (!genre) return res.status(404).send('Genre with the given ID was not found.');

	res.status(204).send(genre);
};

function validateGenre(genre) {
	const schema = Joi.object({
		name: Joi.string().min(3).required()
	});

	return schema.validate(genre);
}