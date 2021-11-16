'use strict';
module.exports = (sequelize, DataTypes) => {
	var cat = sequelize.define('cat', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		title: {
		type: DataTypes.STRING
		},
		slug: {
		type: DataTypes.STRING
		},
		img_url: {
		type: DataTypes.STRING
		}
	});
    cat.sync()
    cat.associate = function(models) {
  };
	return cat;
}