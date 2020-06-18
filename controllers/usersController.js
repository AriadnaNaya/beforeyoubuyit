const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');

const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
	//Ir a registro
	root: (req, res) => {
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
		}
		const newUser = {
			id: users[users.length - 1].id + 1,
			name: req.body.name,
			lastname: req.body.lastname,
			password: bcrypt.hashSync(req.body.password, 10),
			email: req.body.email,
			image: 'default-img.jpg'
		};
		const finalUser = [...users, newUser];
		fs.writeFileSync(usersFilePath, JSON.stringify(finalUser, null, ' '));
		res.redirect('/');
	},
	// Ir al perfil de usuario
	profile: (req, res) => {
		id = req.params.userId;
		const user = users.find(p => p.id == id);
		res.render('profile', {
			user: user
		});
	},
	//ir a pantalla de editar usuario
	edit: (req, res) => {

		id = req.params.userId;
		const userToEdit = users.find(p => p.id == id);

		res.render('user-edit-form', {
			userToEdit: userToEdit
		});

	},
	//Actualizar JSON
	update: (req, res, next) => {

		id = req.params.userId;
		const currentUser = users.find(p => p.id == id);
		currentUser.name = req.body.name;
		currentUser.lastname = req.body.lastname;
		currentUser.email = req.body.email;
		currentUser.password = bcrypt.hashSync(req.body.password, 10);
		currentUser.image = req.files[0].filename;

		fs.writeFileSync(usersFilePath, JSON.stringify(users, null, ' '));

		res.redirect('/');
	},
	//Borrar usuario
	destroy: (req, res) => {
		id = req.params.userId;
		let newUser = users.filter(p => p.id != id);
		fs.writeFileSync(usersFilePath, JSON.stringify(newUser, null, ' '));
		res.redirect('/');
	},
	//Ir a login
	login: (req, res) => {
		res.render('/');
	},

	// Loguea usuario
	logUser: (req, res) => {
		//Validar que exista el mail
		const theUser = users.find((user) => {
		  return user.email === req.body.email;
		});
		if (theUser != undefined) {
		  //Si existe el mail validamos que el password coincida usando bcrypt
		  if (bcrypt.compareSync(req.body.password, theUser.password)) {
			//Si coincide generamos la sesión del usuario
			req.session.user = theUser;
			//Si recordar usuario está checheado guardamos la sesión en una cookie
			if (req.body.remember) {
			  //1er parametro: nombre, 2: valor, 3: Duración em ms
			  //Para guardar la cookie debe hacerse en singular (res.cookie.nombreCookie)
			 
			  //Para requerir la cookie debe hacerse en plural (req.cookies.nombreCookie)
			  
			}
			//Si la contraseña coincide redirigimos al perfil pasandole el ID de la sesión
			res.redirect('/users/profile/' + req.session.user.id);
			//si la pass no coincide lo mandamos a login con error
		  } else {
			res.render('/', {
			  error: 'Usuario incorrecto'
			});
		  }
		} else {
		  res.render('/', {
			error: 'Usuario incorrecto'
		  });
		}
		
	  },
	  // Show user profile
	profile: (req, res) => {
		if (req.session.user === undefined) {
		  return res.redirect('/');
		}
		res.render('profile', {
		  user: req.session.user
		});
	  }
	};
	
	/* Es remplazado por Session y cookie 

	validate: (req, res) => {

		const email = req.body.email;
		const password = req.body.password;

		const user = users.find((user) => {
			return user.email == email;
		});

		if (!user) {
			res.render('login', {
				error: 'Usuario no encontrado!'
			});
		}
		if (!bcrypt.compareSync(password, user.password)) {
			res.render('login', {
				error: 'Password incorrecto!'
			});
		}

		res.send(user)
	}*/


module.exports = controller;