module.exports = function(sequelize, dataTypes) {
    let alias = "order";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        estado:{
            type: dataTypes.STRING
        },
        cantidad:{
            type: dataTypes.INTEGER
        },
        user_id:{
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: "orders",
        timestamps: false
    }

    let order = sequelize.define(alias, cols, config);

    order.associate = function(models) {
        order.hasMany(models.user, {
            as: "user",
            foreignKey: "user_id"
        });
}
        
    order.associate = function(models) {
        order.belongsToMany(models.product, {
            as: "product",
            through: "orders_products",
            foreignKey: "order_id",
            otherKey: "product_id",
            timestamps: false
        });
    }
return order;
}