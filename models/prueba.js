const fs = require('fs');
const path = require('path');

const juegosPath = path.join(__dirname, '../data/juegos.json');


const juegosLista = fs.readFileSync(juegosPath, "utf-8");

console.log (JSON.parse(juegosLista))