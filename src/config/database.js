const mysql = require('mysql');

require('dotenv').config();
/*
host: 'localhost',
user: 'root',
password: '',
database: 'technology_blog'

host: process.env.DATABSE_HOST,
user: process.env.DATABSE_USER,
password: process.env.DATABSE_PASSWORD,
database: process.env.DATABASE_NAME
*/

const connection = mysql.createConnection({
	host: process.env.DATABSE_HOST,
	user: process.env.DATABSE_USER,
	password: process.env.DATABSE_PASSWORD,
	database: process.env.DATABASE_NAME
});

connection.connect(error => {
	if (error) {
		console.warn(`--------- Error ---------`);
		console.warn(error);
		console.warn(`-------------------------`);
	} else {
		console.log(`Database Connected Successfully!`);
		console.log("---------------------------------");
	}
});

module.exports = connection;