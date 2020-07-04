module.exports = function (sequelize, dataTypes) {
  let alias = "Product_Store";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    products_id: {
      type: dataTypes.INTEGER
    },
    stores_id: {
      type: dataTypes.INTEGER
    },
    product_key: {
      type: dataTypes.STRING
    },
  }

  let config = {
    tableName: "products_stores",
    timestamps: false
  }

  let Product_Store = sequelize.define(alias, cols, config);
  Product_Store.associate = function (models) {
    Product.belongsToMany(models.Store, {
      through: Product_Store
    });
    Store.belongsToMany(models.Product, {
      through: Product_Store
    });
  }
  

  return Product_Store;
}