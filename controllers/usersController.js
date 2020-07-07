const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');

let db = require('../database/models');

const {
	check,
	validationResult,
	body
} = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const Image = db.images;

const controller = {
	//Ir a registro
	create: (req, res) => {
		res.render('register');
	},
	//Guardar usuario creado
	store: (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			// console.log(errors);
			// res.send('OK');

			return res.render('register', {
				errors: errors.errors
			});
		};
		console.log(req.body.name + ' ' + req.body.lastname + ' ' + req.body.password + ' ' + req.body.email)
		db.User.create({
			name: req.body.name,
			lastname: req.body.lastname,
			password: bcrypt.hashSync(req.body.password, 10),
			email: req.body.email,
			image: 'default-img.jpg'
		});

		res.redirect("/users/login");
	},
	//ir a pantalla de editar usuario
	edit: (req, res) => {
		db.User.findByPk(req.params.id)
			.then(function (user) {
				res.render("user-edit-form", {
					user: user
				});
			});

	},
	//Actualizar JSON
	update: (req, res, next) => {
		db.User.update({
				name: req.body.name,
				lastname: req.body.lastname,
				password: bcrypt.hashSync(req.body.password, 10),
				email: req.body.email,
				image: 'default-img.jpg'
			}, {
				where: {
					id: req.params.id
				}
			})
			.then(function (user) {
				res.redirect("/users/login" + req.params.id, {
					user: req.session.user
				})
			});
	},
	//Borrar usuario
	destroy: (req, res) => {
		db.User.destroy({
			where: {
				id: req.params.id
			}
		});
		res.redirect("/users/login")
	},

	//Ir a login
	login: (req, res) => {
		res.render('login');
	},

	// Loguea usuario
	logUser: (req, res) => {
		//Validar que exista el mail

		let pedidoUsuario = db.User.findByPk(req.params.id)

		/*	const theUser = users.find((user) => {
			return user.email === req.body.email;
		});*/

		if (pedidoUsuario.email != undefined) {
			//Si existe el mail validamos que el password coincida usando bcrypt
			if (bcrypt.compareSync(req.body.password, pedidoUsuario.password)) {
				//Si coincide generamos la sesión del usuario
				req.session.user = pedidoUsuario;
				//Si recordar usuario está checheado guardamos la sesión en una cookie
				if (req.body.remember) {
					//1er parametro: nombre, 2: valor, 3: Duración em ms
					//Para guardar la cookie debe hacerse en singular (res.cookie.nombreCookie)
					res.cookie('user', pedidoUsuario.id, {
						maxAge: 999999999999999
					});
					//Para requerir la cookie debe hacerse en plural (req.cookies.nombreCookie)
					console.log(req.cookies.user);
				}
				//Si la contraseña coincide redirigimos al perfil pasandole el ID de la sesión
				res.redirect('/users/profile/' + req.session.user.id);
				//si la pass no coincide lo mandamos a login con error
			} else {
				res.render('login', {
					error: 'Usuario incorrecto'
				});
			}
		} else {
			res.render('login', {
				error: 'Usuario incorrecto'
			});
		}
		//res.redirect('/');
	},

	// Show user profile
	profile: (req, res) => {
		if (req.session.user === undefined) {
			return res.redirect('/users/login');
		}
		res.render('profile', {
			user: req.session.user
		});
	}
};


module.exports = controller;