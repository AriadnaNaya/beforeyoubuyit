module.exports = function (sequelize, dataTypes) {
	let alias = "Product";

	let cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
		},
		developers_id: {
			type: dataTypes.INTEGER
		},
		categories_id: {
			type: dataTypes.INTEGER
		},
		name: {
			type: dataTypes.STRING
		},
		price: {
			type: dataTypes.INTEGER
		},
		discount: {
			type: dataTypes.INTEGER
		},
		release: {
			type: dataTypes.STRING
		},
		background_image: {
			type: dataTypes.STRING
		},
		about: {
			type: dataTypes.STRING
		},
		metacritic: {
			type: dataTypes.INTEGER
		},
		rating_bub: {
			type: dataTypes.INTEGER
		},
		game_trailer: {
			type: dataTypes.STRING
		},
		game_review: {
			type: dataTypes.STRING
		},
		game_gameplay: {
			type: dataTypes.STRING
		},
		requirements_min: {
			type: dataTypes.STRING
		},
		requirements_rec: {
			type: dataTypes.STRING
		}
	}

	let config = {
		tableName: "products",
		timestamps: false
	}

	let Product = sequelize.define(alias, cols, config);

	Product.associate = function (models) {
		Product.belongsTo(models.Developer, {
			as: "developers",
			foreignKey: "developers_id"
		});
		Product.belongsToMany(models.Store, {
			as: "stores",
			through: "products_stores",
			foreignKey: "products_id",
			otherKey: "stores_id",
			timestamps: false
		});
		Product.belongsTo(models.Category, {
			as: "categories",
			foreignKey: "categories_id"
		});
		//Crear modelo products_stores
		//Crear modelo products_categories

		//Borrar con asociaciones: Borrar el id de la tabla intermedia
	}

	return Product;
}