const bcrypt = require('bcrypt');
let db = require('../database/models');

const {
	check,
	validationResult,
	body
} = require('express-validator');


const Image = db.images;

const controller = {
	//Ir a registro
	create: (req, res) => {
		res.render('register');
	},
	//Guardar usuario creado
	store: (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// console.log(errors);
				// res.send('OK');

				return res.render('register', {
					errors: errors.errors
				});
			};
			db.User.findOne({
				where: {
					email: req.body.email
				}
			})
			.then((confirmUser)=>{
				if (confirmUser == null || confirmUser.email != req.body.email) {
					db.User.create({
						name: req.body.name,
						lastname: req.body.lastname,
						password: bcrypt.hashSync(req.body.password, 10),
						email: req.body.email,
						image: 'default-img.jpg'
					});

					res.redirect("/users/login");
				} else {
					return res.render('register', {
						customError: 'Debes registrarte con otra dirección de email'
					})
				}
			})
		} catch(err){
			console.log(err);
		}
	},
	//ir a pantalla de editar usuario
	edit: (req, res) => {
		// console.log(req.params.userId);
		db.User.findByPk(req.params.userId)
			.then(function (user) {
				res.render("user-edit-form", {
					userToEdit: user
				});
			});

	},
	//Actualizar JSON
	update: (req, res, next) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// console.log(errors);
				// res.send('OK');

				return res.render('login', {
					errors: errors.errors
				});
			};
			db.User.update({
				name: req.body.name,
				lastname: req.body.lastname,
				password: bcrypt.hashSync(req.body.password, 10),
				email: req.body.email,
				image: req.files[0].filename
			}, {
				where: {
					id: req.params.userId
				}
			})
			.then(function (user) {
				// req.session.user = user;
				// console.log('The user is: ' + user);
				// res.redirect("/users/profile/" + req.params.userId);
				req.session.destroy();
				return res.render('login', {
					customMessage: 'Debes loguearte para continuar!'
				});
			});
		} catch(err) {
			console.log(err);
		}
	},
	//Borrar usuario
	destroy: (req, res) => {
		db.User.destroy({
			where: {
				id: req.params.userId
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
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				// console.log(errors);
				// res.send('OK');

				return res.render('login', {
					errors: errors.errors
				});
			};
			db.User.findOne({
				where: {
					email: req.body.email
				}
			})
			.then((pedidoUsuario) => {
				if (pedidoUsuario != undefined || pedidoUsuario != null) {
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
							console.log('Cookie desde controller ' + req.cookies.user);
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
			});
		} catch(err){
			console.log(err);
		}
	},

	// Cerrar sesión
	logout: (req, res) => {
		req.session.destroy();
		return res.render('login');
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