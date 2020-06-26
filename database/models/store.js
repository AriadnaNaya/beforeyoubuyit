module.exports = function(sequelize, dataTypes) {
    let alias = "store";

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

    let store = sequelize.define(alias, cols, config);

    store.associate = function(models) {
        store.belongsToMany(models.product, {
            as: "products",
            through: "products_stores",
            foreignKey: "stores_id",
            otherKey: "products_id",
            timestamps: false
        });

    
}
return store;
}