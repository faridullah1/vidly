const dotenv = require('dotenv');
dotenv.config({ path: 'config.env'} );

const app = require('./app');

const port = process.env.PORT || 3000;
const server = app.listen(port, () => {
	console.log(`Server is listening on port = ${port}`);
});

module.exports = server;