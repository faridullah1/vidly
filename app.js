const path = require('path');
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(express.urlencoded( { extended: true }));
app.use(cors());
app.use(express.static(path.join(__dirname, 'build')));

require('./src/startup/logging')();
require('./src/startup/routes')(app);
require('./src/startup/db')();
require('./src/startup/config')(app);
require('./src/startup/validation');

module.exports = app;