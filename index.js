const express = require('express');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const graceful = require('./graceful');
const dotenv = require('dotenv');
const routes = require('./routes');

/**
 * Configuring environments
 */
dotenv.config();

const { PORT = 8080 } = process.env;

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('combined'));
app.use(helmet({ frameguard: false }));

/**
 * Defining routes
 */
app.use(routes);

/**
 * Handle errors
 */
app.use(graceful.handleErrors());


/**
 * Start server.
 */
const server = app.listen(PORT, () => console.log(`Server running on ${PORT} port`));

/**
 * Graceful shutdown
 */
process.on('SIGTERM', graceful.shutdown(server));
