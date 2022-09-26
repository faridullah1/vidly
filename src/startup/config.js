const morgan = require('morgan');
const debug = require('debug')('app');

module.exports = function(app) {
	if (app.get('env') === 'development') {
		debug('Morgan enabled')
		app.use(morgan('dev'));
	}
}