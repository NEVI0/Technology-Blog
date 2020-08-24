const bcrypt = require('bcrypt');

const UserProvider = require('../providers/UserProvider');
const PostProvider = require('../providers/PostProvider');

const signupPage = async (request, response) => {
	try {

		/* Pega as informações da sessão */
		const { authenticated, id_user } = request.session;

		/* Verifica se o usuário já está logado */
		if (authenticated && id_user) {
			return response.redirect('/');
		}

		return response.render('signupPage', { error: null });

	} catch (error) {
		return response.status(200).render('applicationError', { error: 'Algo inesperado aconteceu durante algum processo no servidor!' });
	}
}

const signup = async (request, response) => {
	try {

		/* Pega as informações da sessão */
		const { authenticated, id_user } = request.session;

		/* Verifica se o usuário já está logado */
		if (authenticated && id_user) {
			return response.redirect('/');
		}

		/* Pega as informações do usuário */
		const { name, email, password, confirmPassword } = request.body;

		/* Verifica se os campos foram preenchidos */
		if (!name || !email || !password || !confirmPassword) {
			return response.render('signupPage', {
				error: 'Você precisa informar todos os campos!'
			});
		}

		/* Verifica se as senhas são iguais */
		if (password !== confirmPassword) {
			return response.render('signupPage', {
				error: 'As senhas não são iguais!'
			});
		}

		/* Procura um usuário */
		const user = await UserProvider.findUserByEmail(email);

		/* Verifica se já existe algum usuário */
		if (user.length !== 0) {
			return response.render('signupPage', {
				error: 'Um usuário já possui esse e-mail!'
			});
		}

		/* Criptografa a senha */
		const cryptedPassword = bcrypt.hashSync(password, bcrypt.genSaltSync());

		/* Cria um usuário */
		await UserProvider.createNewUser({ name, email, password: cryptedPassword, createdAt: new Date().toISOString() });

		/* Redireciona para a tela de signin */
		return response.redirect(`/success?name=${name}`);

	} catch (error) {
		return response.status(200).render('applicationError', { error: 'Algo inesperado aconteceu durante algum processo no servidor!' });
	}
}

const signin = async (request, response) => {
	try {

		/* Pega as informações da sessão */
		const { authenticated, id_user } = request.session;

		/* Verifica se o usuário já está logado */
		if (authenticated && id_user) {
			return response.redirect('/');
		}

		/* Pega todos os posts */
		const posts = await PostProvider.getAllPosts(10);

		/* Pega as informações do usuário */
		const { email, password } = request.body;

		/* Verifica se os campos foram preenchidos */
		if (!email || !password) {
			return response.render('index', {
				error: 'Você precisa informar todos os campos!',
				user: null,
				posts
			});
		}

		/* Procura o usuário */
		const user = await UserProvider.findUserByEmail(email);

		/* Verifica se existe */
		if (user.length == 0) {
			return response.render('index', {
				error: 'Usuário não encontrado!',
				user: null,
				posts
			});
		}

		/* Compara as senhas */
		if (bcrypt.compareSync(password, user[0].password)) {
			
			request.session.authenticated = true;
			request.session.id_user = user[0].id_user;

			return response.redirect('/account');

		} else {
			return response.render('index', {
				error: 'E-mail ou senha estão incorretos!',
				user: null,
				posts
			});
		}

	} catch (error) {
		return response.status(200).render('applicationError', { error: 'Algo inesperado aconteceu durante algum processo no servidor!' });
	}
}

const success = async (request, response) => {
	try {
		return response.render('success', { name: request.query.name });
	} catch (error) {
		return response.status(500).json({ message: 'Something went wrong!', error });
	}
}

const logout = async (request, response) => {
	try {
		
		/* Pega as informações da sessão */
		const { authenticated, id_user } = request.session;

		/* Verifica se elas existem */
		if (authenticated && id_user) {
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

module.exports = { signup, signin, signupPage, success, logout }