'use strict';
module.exports = (sequelize, DataTypes) => {
	var amountperkm = sequelize.define('amountperkm', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		price: {
		type: DataTypes.TEXT
		},
		updated_at: {
		type: DataTypes.TEXT
		}
	});
    amountperkm.sync()
    amountperkm.associate = function(models) {
  };
	return amountperkm;
}