const db = require('../../database/models');
const sequelize = require('sequelize');

const controller = {
  list: async (req, res) => {
    try {

      let getUsers = await db.User.findAll();
      let usersArr = [];
      let lastId = Math.max.apply(Math, getUsers.map(function (o) { return o.id; }));
      let lastAddedUser = getUsers.find(function (user) {
        return user.id == lastId
      });
      lastUserObj = {
        id: lastAddedUser.id,
          name: lastAddedUser.name,
          lastname: lastAddedUser.lastname,
          email: lastAddedUser.email,
          image: 'http://localhost:5555/assets/users/' + lastAddedUser.image
      };
      
      for (let i = 0; i < getUsers.length; i++) {
        //getUsers[i].setDataValue('endpoint', '/api/users/' + getUsers[i].id);
        // if (!getUsers[i].image.includes('http')) {
        //   getUsers[i].setDataValue('image', 'http://localhost:5555/assets/users/' + getUsers[i].image);
        // }
        usersArr.push({
          id: getUsers[i].id,
          name: getUsers[i].name,
          lastname: getUsers[i].lastname,
          email: getUsers[i].email,
          image: 'http://localhost:5555/assets/users/' + getUsers[i].image,
          endpoint: '/api/users/' + getUsers[i].id
        })
      };
      let users = {
        meta: {
          status: 200,
          totalUsers: usersArr.length,
          lastAdded: lastUserObj,
          url: '/api/users'
        },
        data: usersArr
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
      let userObj = {
        id: user.id,
        name: user.name,
        lastname: user.lastname,
        email: user.email,
        image: 'http://localhost:5555/assets/users/' + user.image
      };
      res.json(userObj);

    } catch (err) {
      console.log(err);
    }
  }

}


module.exports = controller;