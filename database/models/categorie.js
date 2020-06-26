module.exports = function(sequelize, dataTypes) {
    let alias = "categories";

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
        tableName: "categories",
        timestamps: false
    }

    let categories = sequelize.define(alias, cols, config);

    categories.associate = function(models) {
        store.belongsToMany(models.product, {
            as: "products",
            through: "products_categories",
            foreignKey: "categories_id",
            otherKey: "products_id",
            timestamps: false
        });

    
}
return categories;
}