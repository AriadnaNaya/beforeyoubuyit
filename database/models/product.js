module.exports = function(sequelize, dataTypes) {
    let alias = "order";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        name:{
            type: dataTypes.STRING
        },
        price:{
            type: dataTypes.INTEGER
        },
        discount:{
            type: dataTypes.INTEGER
        },
        release:{
            type: dataTypes.STRING
        },
        backgroud_image:{
            type: dataTypes.STRING
        },
        metacritic:{
            type: dataTypes.INTEGER
        },
        rating_bub:{
            type: dataTypes.INTEGER
        },
        game_trailer:{
            type: dataTypes.STRING
        },
        game_review:{
            type: dataTypes.STRING
        },
        game_gameplay:{
            type: dataTypes.STRING
        },
        requirements_min:{
            type: dataTypes.STRING
        },
        requirements_rec:{
            type: dataTypes.STRING
        },
        developers_id:{
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: "products",
        timestamps: false
    }

    let product = sequelize.define(alias, cols, config);

    product.associate = function(models) {
        product.hasMany(models.developer, {
            as: "developers",
            foreignKey: "developers_id"
        });
        product.belongsToMany(models.store, {
            as: "stores",
            through: "products_stores",
            foreignKey: "products_id",
            otherKey: "stores_id",
            timestamps: false
        });
        product.belongsToMany(models.store, {
            as: "categories",
            through: "products_categories",
            foreignKey: "products_id",
            otherKey: "categories_id",
            timestamps: false
        });
    }
    
return product;
}