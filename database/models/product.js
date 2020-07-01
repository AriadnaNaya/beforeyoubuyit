module.exports = function (sequelize, dataTypes) {
	let alias = "Product";

	let cols = {
		id: {
			type: dataTypes.INTEGER,
			primaryKey: true,
			autoIncrement: true
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
		},
		product_key: {
			type: dataTypes.STRING
		},
		developers_id: {
			type: dataTypes.INTEGER
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
		Product.belongsToMany(models.Category, {
			as: "categories",
			through: "products_categories",
			foreignKey: "products_id",
			otherKey: "categories_id",
			timestamps: false
		});
		//Crear modelo products_stores
		//Crear modelo products_categories

		//Borrar con asociaciones: Borrar el id de la tabla intermedia
	}

	return Product;
}