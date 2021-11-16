'use strict';
module.exports = (sequelize, DataTypes) => {
	var maker = sequelize.define('maker', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		name: {
		type: DataTypes.STRING
		},
		img_url: {
		type: DataTypes.TEXT
		}
		
	});
    maker.sync()
    maker.associate = function(models) {
        
  };
	return maker;
}