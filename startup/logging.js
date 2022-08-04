require('express-async-errors');

module.exports = function() {
	process.on('uncaughtException', (err) => {
		console.log('Uncaught exception ->', err);
		process.exit(1);
	});
	
	process.on('unhandledRejection', (err) => {
		console.log('Unhandled reject ->', err);
		process.exit(1);
	});
}