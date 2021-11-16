'use strict';
module.exports = (sequelize, DataTypes) => {
	var model = sequelize.define('model', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		name: {
		type: DataTypes.STRING
		},
		slug: {
		type: DataTypes.STRING
		},
		year: {
		type: DataTypes.INTEGER  
		},
		year_2: {
		type: DataTypes.INTEGER  
		},		
		img_url: {
		type: DataTypes.STRING
		},
		car_id: {
    	  type: DataTypes.UUID,
            allowNull: false,
            references: {  
              model: 'cars',
              key: 'id'
            }
		}
	});
    model.sync()
    model.associate = function(models) {
    model.belongsTo(models.car, {foreignKey: "car_id", as: "car"})
  };
	return model;
}