'use strict';
module.exports = (sequelize, DataTypes) => {
	var car = sequelize.define('car', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		name: {
		type: DataTypes.STRING
		},
		vin: {
		type: DataTypes.STRING
		},
		img_url: {
		type: DataTypes.STRING
		},
	    brand_id: {
    	  type: DataTypes.UUID,
            allowNull: false,
            references: {  
              model: 'brands',
              key: 'id'
            }
		},
	});
    car.sync()
    car.associate = function(models) {
    car.belongsTo(models.brand, {foreignKey: "brand_id", as: "brand"})
    car.hasMany(models.model, {foreignKey: "car_id", as: "models"})
  };
	return car;
}