const connection = require('../config/database');

const createNewPost = (post) => {
	return new Promise(async (resolve, reject) => {
		try {

			const { title, description, idUser, idCategory, createdAt } = post;
			const query = `INSERT INTO tb_post (title, description, fk_id_user, fk_id_category, created_at) VALUES 
			('${title}', '${description}', ${idUser}, ${idCategory}, '${createdAt}')`;

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

const getAllCategories = () => {
	return new Promise(async (resolve, reject) => {
		try {

			const query = `SELECT id_category, name FROM tb_category`;

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

const getUserPosts = (id_user, limit) => {
	return new Promise(async (resolve, reject) => {
		try {

			var query = `SELECT tbp.id_post, tbc.name AS category, tbp.title, tbp.description, tbp.created_at  FROM tb_post AS tbp INNER JOIN tb_category AS tbc ON tbp.fk_id_category = tbc.id_category WHERE fk_id_user = ${id_user} ORDER BY tbp.id_post DESC`;

			if (limit) {
				query += ` LIMIT ${limit}`;
			}

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

const getAllPosts = (limit) => {
	return new Promise(async (resolve, reject) => {
		try {

			var query = `SELECT tbp.id_post, tbu.name AS ower, tbc.name AS category, tbp.title, tbp.description, tbp.created_at FROM tb_post AS tbp INNER JOIN tb_category AS tbc ON tbp.fk_id_category = tbc.id_category INNER JOIN tb_user AS tbu ON tbp.fk_id_user = tbu.id_user ORDER BY tbp.id_post DESC`;

			if (limit) {
				query += ` LIMIT ${limit}`;
			}

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

const getPostById = (id) => {
	return new Promise(async (resolve, reject) => {
		try {

			const query = `SELECT tbp.id_post, tbu.name AS ower, tbc.name AS category, tbp.title, tbp.description, tbp.created_at FROM tb_post AS tbp INNER JOIN tb_category AS tbc ON tbp.fk_id_category = tbc.id_category INNER JOIN tb_user AS tbu ON tbp.fk_id_user = tbu.id_user WHERE id_post = ${id} ORDER BY tbp.id_post DESC`;

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

const deletePostById = (id, userId) => {
	return new Promise(async (resolve, reject) => {
		try {

			const query = `DELETE FROM tb_post WHERE id_post = ${id} AND fk_id_user = ${userId} LIMIT 1`;

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

const deleteUserPostsById = (id) => {
	return new Promise(async (resolve, reject) => {
		try {

			const query = `DELETE FROM tb_post WHERE fk_id_user = ${id}`;

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

module.exports = { createNewPost, getAllCategories, getUserPosts, getAllPosts, getPostById, deletePostById, deleteUserPostsById }