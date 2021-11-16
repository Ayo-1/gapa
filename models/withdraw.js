'use strict';
module.exports = (sequelize, DataTypes) => {
	var withdraw = sequelize.define('withdraw', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		amount: {
		type: DataTypes.TEXT
		},
		points: {
		type: DataTypes.INTEGER
		},
		account_no: {
		type: DataTypes.TEXT
		},
		account_name: {
		type: DataTypes.STRING
		},
		bank: {
		type: DataTypes.STRING
		},		
		bank_code: {
		type: DataTypes.STRING
		},		
		status: {
		type: DataTypes.STRING,
		defaultValue: "pending"
		},		
	    user_id: {
    	  type: DataTypes.UUID,
            allowNull: false,
            references: {  
              model: 'users',
              key: 'id'
            }
		}
		
	});
    withdraw.sync()
    withdraw.associate = function(models) {
    withdraw.belongsTo(models.user, {foreignKey: "user_id", as: "user"})
  };
	return withdraw;
}