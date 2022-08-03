const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	name: {
		type: String,
		required: true,
		minlength: 3
	}
});

const Genre = mongoose.model('Genre', schema);

module.exports = Genre;