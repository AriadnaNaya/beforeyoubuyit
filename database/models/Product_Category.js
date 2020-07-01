module.exports = function (sequelize, dataTypes) {
  let alias = "Product_Category";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    products_id: {
      type: dataTypes.INTEGER
    },
    categories_id: {
      type: dataTypes.INTEGER
    },
  }

  let config = {
    tableName: "products_categories",
    timestamps: false
  }

  let Product_Category = sequelize.define(alias, cols, config);

  //Crear modelo products_stores
  //Crear modelo products_categories

  //Borrar con asociaciones: Borrar el id de la tabla intermedia

  return Product_Category;
}