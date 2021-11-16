'use strict';
module.exports = (sequelize, DataTypes) => {
	var page = sequelize.define('page', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		name: {
		type: DataTypes.STRING
		},
		body: {
		type: DataTypes.TEXT
		},
	});
    page.sync()
    page.associate = function(models) {
  };
	return page;
}