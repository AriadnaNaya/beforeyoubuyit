const db = require('../../database/models');

const toThousand = n => n.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
const finalPrice = (price, discount) => {
  if (discount > 0) {
    price = price - (price * discount / 100);
  } else {
    price = price;
  }
  return toThousand(price);
}

const formatReleaseDate = (date) => {
  let parts = date.split('-');
  const options = {
    weekday: 'long',
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  };
  // Please pay attention to the month (parts[1]); JavaScript counts months from 0:
  // January - 0, February - 1, etc.
  var mydate = new Date(Date.UTC(parts[0], parts[1] - 1, parts[2]));
  //mydate = mydate.toLocaleDateString('es-ES', options);
  mydate = mydate.toDateString('es-ES');
  return mydate;
}


const controller = {
  root: async (req, res) => {
    try {
      let getProducts = await db.Product.findAll({
        include: [{
          association: 'stores'
        }]
      });
      for (let i = 0; i < getProducts.length; i++) {
        getProducts[i].setDataValue('endpoint', '/api/products/' + getProducts[i].id);

      }
      let products = {
        meta: {
          status: 200,
          totalProducts: getProducts.length,
          url: '/api/products'
        },
        data: getProducts
      }
      res.json(products)
      // res.render('products', {
      //   products: product
      // });
    } catch (err) {
      console.log(err);

    }
  },
}

module.exports = controller;