const express = require('express');
const compression = require('compression');
const path = require('path');

module.exports = function(app) {
	app.use(express.static(path.join(__dirname, 'public')));
	app.use(compression());
}