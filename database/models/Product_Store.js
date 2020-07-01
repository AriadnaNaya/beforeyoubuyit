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
  }

  let config = {
    tableName: "products_stores",
    timestamps: false
  }

  let Product_Store = sequelize.define(alias, cols, config);
  
  //Crear modelo products_stores
  //Crear modelo products_categories

  //Borrar con asociaciones: Borrar el id de la tabla intermedia

  return Product_Store;
}