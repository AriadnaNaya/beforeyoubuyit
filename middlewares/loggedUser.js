const fs = require('fs');
const path = require('path');
//Traemos el usuario para validar con la cookie
const usersFilePath = path.join(__dirname, '../data/usersDataBase.json');
const users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

let loggedUser = (req, res, next) => {
  //Valida que exosta una sesión guardada
  //Si no existe sesión redirige a login
  if (req.session.user === undefined) {
    //Si el usuario no tiene la sesión pero tiene la cookie
    //Guardamos en session el user (theUser)
    if (req.cookies.user) {
      const theUser = users.find((user) => {
        //Validamos el id de usuario con el valor de la cookie
        return user.id == req.cookies.user;
      });
      req.session.user = theUser;
    } else {
      return res.redirect('/users/login');
    }
  }
  next();
}

module.exports = loggedUser;