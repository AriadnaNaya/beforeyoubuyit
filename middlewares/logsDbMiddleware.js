const fs = require('fs');

let logsMiddleware = (req, res, next) => {
  fs.appendFileSync('logsDB.txt', 'Se ingresó en ' + req.url + "\n");
  next();
}

module.exports = logsMiddleware;