module.exports = function(sequelize, dataTypes) {
    let alias = "Order";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    estado: {
      type: dataTypes.STRING
    },
    cantidad: {
      type: dataTypes.INTEGER
    },
    user_id: {
      type: dataTypes.INTEGER
    }
  }

  let config = {
    tableName: "orders",
    timestamps: false
  }

    let Order = sequelize.define(alias, cols, config);

    Order.associate = function(models) {
        Order.hasMany(models.User, {
            as: "user",
            foreignKey: "user_id"
        });
}
        
    Order.associate = function(models) {
        Order.belongsToMany(models.Product, {
            as: "product",
            through: "orders_products",
            foreignKey: "order_id",
            otherKey: "product_id",
            timestamps: false
        });
    }
return Order;
}