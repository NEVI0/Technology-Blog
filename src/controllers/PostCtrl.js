const UserProvider = require('../providers/UserProvider');
const PostProvider = require('../providers/PostProvider');

const createNewPost = async (request, response) => {
	try {

		/* Pega as informações da sessão */
		const { authenticated, id_user } = request.session;

		/* Verifica se o usuário já está logado */
		if (!authenticated && !id_user) {
			return response.redirect('/');
		}

		/* Pega todas categorias, posts e informações do usuário */
		const user = await UserProvider.findUserById(id_user);
		const posts = await PostProvider.getUserPosts(id_user, 10);
		const categories = await PostProvider.getAllCategories();

		/* Pega as informações */
		const { title, category, description } = request.body;

		/* Verifica se estão preenchidas */
		if (!title || !category || !description) {
			return response.render('account', {
				user: user[0], categories, posts, error: 'Você precisa informar todos os campos!'
			})
		}

		const post = { title, description, idUser: id_user, idCategory: category, createdAt: new Date().toISOString() }

		/* Inseri o novo post */
		await PostProvider.createNewPost(post);

		return response.redirect('/account');

	} catch (error) {
		return response.status(200).render('applicationError', { error: 'Algo inesperado aconteceu durante algum processo no servidor!' });
	}
}

const getInitialPosts = async (request, response) => {
	try {

		/* Pega as informações da sessão */
		const { authenticated, id_user } = request.session;

		/* Pega todos os posts */
		const posts = await PostProvider.getAllPosts(10);

		/* Verifica os dados */
		if (!authenticated || !id_user) {
			return response.status(200).render('index', { user: null, posts, error: null });
		} else {
			return response.status(200).render('index', { user: id_user, posts,  error: null });
		}
		

	} catch (error) {
		return response.status(200).render('applicationError', { error: 'Algo inesperado aconteceu durante algum processo no servidor!' });
	}
}

const getAllPosts = async (request, response) => {
	try {

		/* Pega as informações da sessão */
		const { authenticated, id_user } = request.session;

		/* Pega todos os posts */
		const posts = await PostProvider.getAllPosts(null);

		/* Verifica os dados */
		if (!authenticated || !id_user) {
			return response.status(200).render('allPosts', { user: null, posts, error: null });
		} else {
			return response.status(200).render('allPosts', { user: id_user, posts,  error: null });
		}
		
	} catch (error) {
		return response.status(200).render('applicationError', { error: 'Algo inesperado aconteceu durante algum processo no servidor!' });
	}
}

const getPostDetails = async (request, response) => {
	try {

		/* Pega o ID do Post */
		const { id } = request.query;

		/* Pega todos os posts */
		const post = await PostProvider.getPostById(id);

		if (post.length == 0) {
			return response.status(200).render('applicationError', { error: 'Parece que o post selecionado não existe!' });
		} else {
			return response.status(200).render('detail', { post: post[0] });
		}

	} catch (error) {
		return response.status(200).render('applicationError', { error: 'Algo inesperado aconteceu durante algum processo no servidor!' });
	}
}

const getAllUserPosts = async (request, response) => {
	try {

		/* Pega as informações da sessão */
		const { authenticated, id_user } = request.session;

		/* Verifica os dados */
		if (!authenticated || !id_user) {
			return response.redirect('/');
		} else {

			/* Pega todos os posts */
			const posts = await PostProvider.getUserPosts(id_user, null);
			const user = await UserProvider.findUserById(id_user);
			return response.status(200).render('allUserPosts', { user: user[0], posts });
			
		}		

	} catch (error) {
		return response.status(200).render('applicationError', { error: 'Algo inesperado aconteceu durante algum processo no servidor!' });
	}
}

const deletePostById = async (request, response) => {
	try {

		/* Pega as informações da sessão */
		const { authenticated, id_user } = request.session;

		/* Verifica se o usuário já está logado */
		if (!authenticated && !id_user) {
			return response.redirect('/');
		}

		await PostProvider.deletePostById(request.params.id, id_user); /* Deleta o post */
		return response.redirect('/account'); /* Redireciona para a página da conta */

	} catch (error) {
		return response.status(200).render('applicationError', { error: 'Algo inesperado aconteceu durante algum processo no servidor!' });
	}
}

module.exports = { createNewPost, getInitialPosts, getAllPosts, getPostDetails, getAllUserPosts, deletePostById }