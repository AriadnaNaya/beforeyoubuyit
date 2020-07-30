const db = require('../../database/models');
const sequelize = require('sequelize');
const {
  QueryTypes
} = require('sequelize');

const controller = {
  list: async (req, res) => {
    try {
      let getCountByCategory = await db.sequelize.query(
        'select count(categories.name) as count, categories.name from products inner join categories on categories.id = categories_id group by categories_id', {
          replacements: {
            status: 'active'
          },
          type: QueryTypes.SELECT
        });
      let getProducts = await db.Product.findAll({
        include: [{
            association: 'stores'
          },
          {
            association: 'developers'
          },
          {
            association: 'categories'
          }
        ]

      });
      let totalCategories = await db.Category.count();
      Promise.all([getProducts, getCountByCategory, totalCategories])
      .then(([getProducts, getCountByCategory, totalCategories]) => {
        for (let i = 0; i < getProducts.length; i++) {
          getProducts[i].setDataValue('endpoint', '/api/products/' + getProducts[i].id);
          if (!getProducts[i].background_image.includes('http')) {
            getProducts[i].setDataValue('background_image', 'http://localhost:5555/assets/products/' + getProducts[i].background_image);
          }
        }
        let countByCategory = {};
        for (let j = 0; j < getCountByCategory.length; j++) {
          countByCategory[getCountByCategory[j].name] = getCountByCategory[j].count;
        }
        let products = {
          meta: {
            status: 200,
            totalProducts: getProducts.length,
            totalCategories: totalCategories,
            getCountByCategory: countByCategory,
            url: '/api/products'
          },
          data: getProducts
        }
        res.json(products);
      })
      
    } catch (err) {
      console.log(err);

    }
  },
  find: async (req, res, next) => {
    try {
      let idJuego = req.params.id;
      let gameList = await db.Product.findByPk(idJuego, {
        include: [{
            association: 'stores'
          },
          {
            association: 'developers'
          },
          {
            association: 'categories'
          }
        ]
      });
      res.json(gameList);

    } catch (err) {
      console.log(err);
    }
  }

}


module.exports = controller;