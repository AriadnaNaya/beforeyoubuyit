module.exports = function(sequelize, dataTypes) {
    let alias = "Store";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        name:{
            type: dataTypes.STRING
        }

    }

    let config = {
        tableName: "stores",
        timestamps: false
    }

    let Store = sequelize.define(alias, cols, config);

    Store.associate = function(models) {
        Store.belongsToMany(models.Product, {
            as: "products",
            through: "products_stores",
            foreignKey: "stores_id",
            otherKey: "products_id",
            timestamps: false
        });

    
}
return Store;
}