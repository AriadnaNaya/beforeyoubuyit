module.exports = function (sequelize, dataTypes) {
  let alias = "Developer";

  let cols = {
    id: {
      type: dataTypes.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    name: {
      type: dataTypes.STRING
    }
  }

  let config = {
    tableName: "developers",
    timestamps: false
  }

  let Developer = sequelize.define(alias, cols, config);

  Developer.associate = function (models) {
    Developer.hasMany(models.Product, {
      as: "products",
      foreignKey: "developers_id"
    });
  }
  return Developer;
}