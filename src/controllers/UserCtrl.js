const UserProvider = require('../providers/UserProvider');
const PostProvider = require('../providers/PostProvider');

const getUser = async (request, response) => {
	try {

		/* Pega as informações da sessão */
		const { authenticated, id_user } = request.session;

		/* Verifica se elas existem */
		if (authenticated && id_user) {


			/* Pega todas categorias, posts e informações do usuário */
			const categories = await PostProvider.getAllCategories();
			const posts = await PostProvider.getUserPosts(id_user, 5);
			const user = await UserProvider.findUserById(id_user);

			return response.render('account', {
				user: user[0], 
				categories,
				posts,
				error: null
			});

		} else {
			return response.redirect('/');
		}

	} catch (error) {
		return response.status(200).render('applicationError', { error: 'Algo inesperado aconteceu durante algum processo no servidor!' });
	}
}

const deleteAccount = async (request, response) => {
	try {

		/* Pega as informações da sessão */
		const { authenticated, id_user } = request.session;

		/* Verifica se elas existem */
		if (authenticated && id_user) {

			await PostProvider.deleteUserPostsById(id_user);
			await UserProvider.deleteUserById(id_user);

			request.session.destroy((error) => {
				if (error) {
					return response.status(500).json(error);
				} else {
					return response.redirect('/');
				}
			});

		} else {
			return response.redirect('/');
		}

	} catch (error) {
		return response.status(200).render('applicationError', { error: 'Algo inesperado aconteceu durante algum processo no servidor!' });
	}
}

module.exports = { getUser, deleteAccount }