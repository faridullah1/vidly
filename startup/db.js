const mongoose = require('mongoose');

module.exports = function() {
	let db = process.env.DATABASE;
	if (process.env.NODE_ENV === 'test') {
		db = process.env.DATABASE_TEST;
	}	
	mongoose.connect(db)
		.then(() => console.log(`Connected to ${db}`))
		.catch(err => console.log('Could not connect to database...', err));
}