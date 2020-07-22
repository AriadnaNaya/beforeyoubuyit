
const db = require('../database/models');

let loggedUser = (req, res, next) => {
  //Valida que exosta una sesión guardada
  //Si no existe sesión redirige a login
  if (req.session.user === undefined) {
    //Si el usuario no tiene la sesión pero tiene la cookie
    //Guardamos en session el user (theUser)
    if (req.cookies.user) {
      console.log('Existe cookie: ' + req.cookies.user);
      db.User.findOne({
        where: {
          email: req.body.email
        }
      })
      .then((user)=>{
        console.log('Respuesta usuario: ' + user);
        if (user.id == req.cookies.user) {
          req.session.user = theUser;
        } else {
           return res.redirect('/users/login');
        }
      });
    } 
  }
  next();
}

module.exports = loggedUser;