const fs = require('fs');

let carritoLista = fs.readFileSync("data/carrito.json", "utf-8");

let productoCarrito = JSON.parse(carritoLista);

module.exports = productoCarrito;



