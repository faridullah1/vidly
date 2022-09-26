const mongoose = require('mongoose');

module.exports = function() {
	let db = process.env.DATABASE_LOCAL;
	if (process.env.NODE_ENV === 'test') {
		db = process.env.DATABASE_TEST;
	}	
	else if (process.env.NODE_ENV === 'production') {
		db = process.env.DATABASE
	}
	mongoose.connect(db)
		.then(() => console.log(`Connected to ${db}`))
		.catch(err => console.log('Could not connect to database...', err));
}