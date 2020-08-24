const connection = require('../config/database');

const createNewUser = (user) => {
	return new Promise(async (resolve, reject) => {
		try {

			const { name, email, password, createdAt } = user;
			const query = `INSERT INTO tb_user (name, email, password, created_at) VALUES ('${name}', '${email}', '${password}', '${createdAt}')`;

			connection.query(query, (error, results) => {
				if (error) {
					return reject(error);
				} else {
					return resolve(results);
				}			
			});

		} catch (error) {
			return reject(error);
		}
	});
}

const findUserByEmail = (email) => {
	return new Promise(async (resolve, reject) => {
		try {

			const query = `SELECT id_user, name, email, password FROM tb_user WHERE email = '${email}' LIMIT 1`;

			connection.query(query, (error, results) => {
				if (error) {
					return reject(error);
				} else {
					return resolve(results);
				}
			});

		} catch (error) {
			return reject(error);
		}
	});
}

const findUserById = (id) => {
	return new Promise(async (resolve, reject) => {
		try {

			const query = `SELECT id_user, name, email FROM tb_user WHERE id_user = ${id} LIMIT 1`;

			connection.query(query, (error, results) => {
				if (error) {
					return reject(error);
				} else {
					return resolve(results);
				}
			});

		} catch (error) {
			return reject(error);
		}
	});
}

const deleteUserById = (id) => {
	return new Promise(async (resolve, reject) => {
		try {

			const query = `DELETE FROM tb_user WHERE id_user = ${id} LIMIT 1`;

			connection.query(query, (error, results) => {
				if (error) {
					return reject(error);
				} else {
					return resolve(results);
				}
			});

		} catch (error) {
			return reject(error);
		}
	});
}

module.exports = { createNewUser, findUserByEmail, findUserById, deleteUserById }