const express = require('express');
const Joi = require('joi');
const router = express.Router();

const genres = [
	{ id: 1, name: 'horror' },
	{ id: 2, name: 'action' },
	{ id: 3, name: 'comedy' },
];

router.get('/', (req, res) => {
	res.status(200).send(genres);
});

router.get('/:id', (req, res) => {
	const genre = genres.find(g => g.id === parseInt(req.params.id));
	if (!genre) return res.status(404).send('Genre with the given ID was not found.');

	res.status(200).send(genre);
});

router.post('/', (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.message);

	const genre = {
		id: genres.length + 1,
		name: req.body.name
	};
	genres.push(genre);

	res.status(200).send(genre);
});

router.put('/:id', (req, res) => {
	const genre = genres.find(g => g.id === parseInt(req.params.id));
	if (!genre) return res.status(404).send('Genre with the given ID was not found.');

	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.message);

	genre.name = req.body.name

	res.status(200).send(genre);
});

router.delete('/:id', (req, res) => {
	const genre = genres.find(g => g.id === parseInt(req.params.id));
	if (!genre) return res.status(404).send('Genre with the given ID was not found.');

	const index = genres.indexOf(genre);
	genres.splice(index, 1);

	res.status(204).send(genre);
});

function validateGenre(genre) {
	const schema = Joi.object({
		name: Joi.string().min(3).required()
	});

	return schema.validate(genre);
}

module.exports = router;