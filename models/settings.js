'use strict';
module.exports = (sequelize, DataTypes) => {
	var setting = sequelize.define('setting', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		address: {
		type: DataTypes.TEXT
		},
		email: {
		type: DataTypes.TEXT
		},
		phone_1: {
		type: DataTypes.TEXT
		},
		phone_2: {
		type: DataTypes.TEXT
		},
		hours: {
		type: DataTypes.TEXT
		},
		points: {
		type: DataTypes.TEXT
		},
		logo: {
		type: DataTypes.TEXT
		},
		slider_1: {
		type: DataTypes.TEXT
		},
		slider_2: {
		type: DataTypes.TEXT
		},	
		slider_3: {
		type: DataTypes.TEXT
		},
		coming_soon: {
		type: DataTypes.STRING,
		defaultValue: "false"
		}
	});
    setting.sync()
    setting.associate = function(models) {
  };
	return setting;
}