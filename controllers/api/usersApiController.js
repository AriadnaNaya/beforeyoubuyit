const db = require('../../database/models');
const sequelize = require('sequelize');

const controller = {
  list: async (req, res) => {
    try {

      let getUsers = await db.User.findAll();
      for (let i = 0; i < getUsers.length; i++) {
        getUsers[i].setDataValue('endpoint', '/api/users/' + getUsers[i].id);
      };
      let users = {
        meta: {
          status: 200,
          totalUsers: getUsers.length,
          url: '/api/users'
        },
        data: getUsers
      }
      res.json(users);
    } catch (err) {
      console.log(err);

    }
  },
  find: async (req, res, next) => {
    try {
      let id = req.params.id;
      let user = await db.User.findByPk(id);
      res.json(user);

    } catch (err) {
      console.log(err);
    }
  }

}


module.exports = controller;