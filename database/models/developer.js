module.exports = function(sequelize, dataTypes) {
    let alias = "developers";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        name:{
            type: dataTypes.STRING
        },
        products_id:{
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: "developers",
        timestamps: false
    }

    let developers = sequelize.define(alias, cols, config);

    developers.associate = function(models) {
        developers.hasMany(models.products, {
            as: "products",
            foreignKey: "products_id"
        });
    
    
    }
return order;
}