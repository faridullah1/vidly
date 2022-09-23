const express = require('express');
const compression = require('compression');

module.exports = function(app) {
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(compression());
}