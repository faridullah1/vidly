const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app');

const homeRouter = require('./routes/homeRoute');
const genreRouter = require('./routes/genreRoutes');
const customerRouter = require('./routes/customerRoutes');
const movieRouter = require('./routes/movieRoutes');

const app = express();
app.use(express.json());
app.use(express.urlencoded( { extended: true }));

if (app.get('env') === 'development') {
	debug('Morgan enabled')
	app.use(morgan('dev'));
}

app.use('/', homeRouter);
app.use('/api/v1/genres', genreRouter);
app.use('/api/v1/customers', customerRouter);
app.use('/api/v1/movies', movieRouter);

module.exports = app;