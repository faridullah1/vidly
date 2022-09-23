const express = require('express');
const cors = require('cors');
const app = express();

app.use(cors());

require('./startup/logging')();
require('./startup/routes')(app);
require('./startup/db')();
require('./startup/config')(app);
require('./startup/validation');
require('./startup/prod')(app);

module.exports = app;