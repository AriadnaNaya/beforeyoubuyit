const fs = require('fs');
const path = require('path');
const bcrypt = require('bcrypt');


const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));



const controller = {
    root: (req, res) => {
        
        res.render('register',{
            title: 'Login',
            nombre: 'Homero',
            apellido: 'Thompson'
            });
    },
    store: (req, res, next) => {
        const newUser = {
            id: users[users.length - 1].id + 1,
            name: req.body.name,
            lastname: req.body.lastname,
            password: bcrypt.hashSync(req.body.password, 10),
            email: req.body.email,
            avatar: req.files[0].filename
        };
        
        const userToSave = [...users, newUser];
        fs.writeFileSync(usersFilePath, JSON.stringify(userToSave, null, ' '));
        res.redirect('juegos',{
            title: 'Login',
            nombre: 'Homero',
            apellido: 'Thompson'
            });
    },
    login: (req, res) => {
        res.render('juegos');
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
        if(!bcrypt.compareSync(password, user.password)) {
            res.render('login', {
                error: 'Password incorrecto!'
            });
        }

        res.send(user)
    }
};

module.exports = controller;