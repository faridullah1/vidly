const express = require('express');
const errorHandler = require('../middleware/error');

const homeRouter = require('../routes/homeRoute');
const genreRouter = require('../routes/genreRoutes');
const customerRouter = require('../routes/customerRoutes');
const movieRouter = require('../routes/movieRoutes');
const rentalRouter = require('../routes/rentalRoutes');
const userRouter = require('../routes/userRoutes');
const authRouter = require('../routes/authRoutes');

module.exports = function(app) {
	app.use(express.json());
	app.use(express.urlencoded( { extended: true }));

	app.use('/', homeRouter);
	app.use('/api/v1/genres', genreRouter);
	app.use('/api/v1/customers', customerRouter);
	app.use('/api/v1/movies', movieRouter);
	app.use('/api/v1/rentals', rentalRouter);
	app.use('/api/v1/users', userRouter);
	app.use('/api/v1/auth', authRouter);

	app.use(errorHandler);
}