const dotenv = require('dotenv');
const mongoose = require('mongoose');

dotenv.config({ path: 'config.env'} );

const databaseURL = process.env.DATABASE;
mongoose.connect(databaseURL)
	.then(() => console.log('Connected to database'))
	.catch(err => console.log('Could not connect to database...', err));

const app = require('./app');

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is listening on port = ${port}`);
});