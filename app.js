const express = require('express');
const morgan = require('morgan');
const debug = require('debug')('app');
const Joi = require('joi');
Joi.objectId = require('joi-objectid')(Joi);
require('express-async-errors');

process.on('uncaughtException', (err) => {
	console.log('Uncaught exception ->', err);
	process.exit(1);
});

process.on('unhandledRejection', (err) => {
	console.log('Unhandled reject ->', err);
	process.exit(1);
});

const errorHandler = require('./middleware/error');

const homeRouter = require('./routes/homeRoute');
const genreRouter = require('./routes/genreRoutes');
const customerRouter = require('./routes/customerRoutes');
const movieRouter = require('./routes/movieRoutes');
const rentalRouter = require('./routes/rentalRoutes');
const userRouter = require('./routes/userRoutes');
const authRouter = require('./routes/authRoutes');

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
app.use('/api/v1/rentals', rentalRouter);
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);

app.use(errorHandler);

module.exports = app;