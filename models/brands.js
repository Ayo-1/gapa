'use strict';
module.exports = (sequelize, DataTypes) => {
	var brand = sequelize.define('brand', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		name: {
		type: DataTypes.STRING
		},
		description: {
		type: DataTypes.TEXT
		},
		img_url: {
		type: DataTypes.STRING
		},
		vin: {
		type: DataTypes.STRING
		},
		slug: {
		type: DataTypes.STRING
		}
		
	});
    brand.sync()
    brand.associate = function(models) {
    brand.hasMany(models.car, {foreignKey: "brand_id", as: "cars"})
  };
	return brand;
}