const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const session = require('express-session');

const routes = require('./routes');

require('dotenv').config();

const server = express();

server.use(express.static('src/public'));
server.use(bodyParser.urlencoded({ extended: true }));
server.use(bodyParser.json());
server.use(morgan("dev"));
server.use(session({
	secret: process.env.SESSION_SECRET,
	resave: true,
	saveUninitialized: true
}));

server.set('views', 'src/views');
server.set('view engine', 'ejs');

const port = process.env.PORT || 3000;

server.listen(port, () => {
	console.log("---------------------------------");
	console.log(`Server's Running on Port: ${port}`);
});

module.exports = server;