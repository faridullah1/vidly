const path = require('path');
const errorHandler = require('../middleware/error');

const genreRouter = require('../routes/genreRoutes');
const customerRouter = require('../routes/customerRoutes');
const movieRouter = require('../routes/movieRoutes');
const rentalRouter = require('../routes/rentalRoutes');
const returnsRouter = require('../routes/returnsRoutes');
const userRouter = require('../routes/userRoutes');
const authRouter = require('../routes/authRoutes');

module.exports = function(app) {
	app.use('/api/v1/genres', genreRouter);
	app.use('/api/v1/customers', customerRouter);
	app.use('/api/v1/movies', movieRouter);
	app.use('/api/v1/rentals', rentalRouter);
	app.use('/api/v1/returns', returnsRouter);
	app.use('/api/v1/users', userRouter);
	app.use('/api/v1/auth', authRouter);

	// Handling View routes
	app.use('/', (req, res) => {
		res.sendFile(path.join(__dirname, '../../build'));
	});

	app.use(errorHandler);
}