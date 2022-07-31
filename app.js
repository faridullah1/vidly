const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app');
const genreRoutes = require('./routes/genres');

const app = express();
app.use(express.json());
app.use(express.urlencoded( { extended: true }));

if (app.get('env') === 'development') {
	debug('Morgan enabled')
	app.use(morgan('tiny'));
}

app.get('/', (req, res) => {
	res.status(200).send('Welcome to Vidly!');
});

app.use('/api/genres', genreRoutes);

module.exports = app;