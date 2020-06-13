const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');
const { check, validationResult, body } = require('express-validator');



const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

const controller = {
	root: (req, res) => {
		res.render('register');
	},
	store: (req, res, next) => {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			console.log(errors.errors);
			
			res.send('Ok');
			// return res.render('register', {
			// 	errors: errors.errors
			// });
		}

		const newID = users.length + 1;
		const newUser = {
			id: newID,
			name: req.body.name,
			lastname: req.body.lastname,
			password: bcrypt.hashSync(req.body.password, 10),
			email: req.body.email,
			avatar: req.files[0].filename
		};

		const finalUser = [...users, newUser];
		fs.writeFileSync(usersFilePath, JSON.stringify(finalUser, null, ' '));
		res.redirect('/');
	},
	edit: (req, res) => {

		id = req.params.userId;
		const userToEdit = users.find(p => p.id == id);

		res.render('user-edit-form', {
			userToEdit: userToEdit
		});

	},

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

	destroy: (req, res) => {
		id = req.params.userId;
		let newUser = users.filter(p => p.id != id);
		fs.writeFileSync(usersFilePath, JSON.stringify(newUser, null, ' '));
		res.redirect('/');
	},

	login: (req, res) => {
		res.render('/');
	},
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
	}
};

module.exports = controller;