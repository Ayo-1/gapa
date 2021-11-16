'use strict';
module.exports = (sequelize, DataTypes) => {
	var payment = sequelize.define('payment', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		amount: {
		type: DataTypes.INTEGER
		},
		tnx_id: {
		type: DataTypes.TEXT
		}
	});
    payment.sync()
    payment.associate = function(models) {
  };
	return payment;
}