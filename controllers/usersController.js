//** Requires */
//const fs = require('fs');
//const path = require('path');
const controller = {

    registroUsuario: (req, res, next) => {
        res.render('registro', 
        { title: 'Registro',
          nombre: 'Homero',
          apellido: 'Thompson'
        });
    },

}

module.exports = controller;