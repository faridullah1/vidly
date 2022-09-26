const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'public')));

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')(app);
require('./startup/validation');

module.exports = app;