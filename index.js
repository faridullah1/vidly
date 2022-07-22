const express = require('express');
const Joi = require('joi');
const morgan = require('morgan');
const dotenv = require('dotenv');
const debug = require('debug')('app:startup')

dotenv.config({ path: 'config.env'} );

const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true }));

if (app.get('env') === 'development') {
	debug('Morgan enabled')
	app.use(morgan('tiny'));
}

const genres = [
	{ id: 1, name: 'horror' },
	{ id: 2, name: 'action' },
	{ id: 3, name: 'comedy' },
];

app.get('/', (req, res) => {
	res.status(200).send('Welcome to Vidly!');
});

app.get('/api/genres', (req, res) => {
	res.status(200).send(genres);
});

app.get('/api/genres/:id', (req, res) => {
	const genre = genres.find(g => g.id === parseInt(req.params.id));
	if (!genre) return res.status(404).send('Genre with the given ID was not found.');

	res.status(200).send(genre);
});

app.post('/api/genres', (req, res) => {
	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.message);

	const genre = {
		id: genres.length + 1,
		name: req.body.name
	};
	genres.push(genre);

	res.status(200).send(genre);
});

app.put('/api/genres/:id', (req, res) => {
	const genre = genres.find(g => g.id === parseInt(req.params.id));
	if (!genre) return res.status(404).send('Genre with the given ID was not found.');

	const { error } = validateGenre(req.body);
	if (error) return res.status(400).send(error.message);

	genre.name = req.body.name

	res.status(200).send(genre);
});

app.delete('/api/genres/:id', (req, res) => {
	const genre = genres.find(g => g.id === parseInt(req.params.id));
	if (!genre) return res.status(404).send('Genre with the given ID was not found.');

	const index = genres.indexOf(genre);
	genres.splice(index, 1);

	res.status(204).send(genre);
});

app.get('/', (req, res) => {
	res.status(200).send('Welcome to Vidly!');
});

function validateGenre(genre) {
	const schema = Joi.object({
		name: Joi.string().min(3).required()
	});

	return schema.validate(genre);
}

const port = process.env.PORT || 3000;

app.listen(port, () => {
	console.log(`Server is listening on port = ${port}`);
});