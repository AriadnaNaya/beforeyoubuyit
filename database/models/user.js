module.exports = function(sequelize, dataTypes) {
    let alias = "User";

    let cols = {
        id:{
            type: dataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true  
        },
        name:{
            type: dataTypes.STRING
        },
        last_name:{
            type: dataTypes.STRING
        },
        password:{
            type: dataTypes.STRING
        },
        email:{
            type: dataTypes.STRING
        },
        image:{
            type: dataTypes.STRING
        },
        order_id:{
            type: dataTypes.INTEGER
        }
    }

    let config = {
        tableName: "users",
        timestamps: false
    }

    let User = sequelize.define(alias, cols, config);

    User.associate = function(models) {
        User.hasMany(models.Order, {
            as: "order",
            foreignKey: "order_id"
        });
    
}
return User;
}