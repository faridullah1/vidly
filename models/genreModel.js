const mongoose = require('mongoose');

const schema = new mongoose.Schema({
	name: String
});

const Genre = mongoose.model('Genre', schema);

module.exports = Genre;