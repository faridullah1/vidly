const mongoose = require('mongoose');

module.exports = function() {
	const databaseURL = process.env.DATABASE;
	mongoose.connect(databaseURL)
		.then(() => console.log('Connected to database'))
		.catch(err => console.log('Could not connect to database...', err));
}