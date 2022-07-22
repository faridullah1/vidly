const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const debug = require('debug')('app:startup');
const genreRoutes = require('./routes/genres');

dotenv.config({ path: 'config.env'} );
const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true }));

if (app.get('env') === 'development') {
	debug('Morgan enabled')
	app.use(morgan('tiny'));
}

app.get('/', (req, res) => {
	res.status(200).send('Welcome to Vidly!');
});

app.use('/api/genres', genreRoutes);

const port = process.env.PORT || 3000;
app.listen(port, () => {
	console.log(`Server is listening on port = ${port}`);
});