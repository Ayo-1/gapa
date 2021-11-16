'use strict';
module.exports = (sequelize, DataTypes) => {
	var logistic = sequelize.define('logistic', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		name: {
		type: DataTypes.TEXT  
		},
		phone: {
		type: DataTypes.TEXT  
		},
		email: {
		type: DataTypes.TEXT  
		},
	    pickup: {
		type: DataTypes.TEXT  
		},
		depart: {
		type: DataTypes.TEXT  
		},
		currentadd: {
		type: DataTypes.TEXT  
		},
		cost: {
		type: DataTypes.TEXT  
		},
		payment: {
		type: DataTypes.TEXT  
		},
		pending: {
		type: DataTypes.INTEGER  
		},
		ongoing: {
		type: DataTypes.INTEGER  
		},
		delivered: {
		type: DataTypes.INTEGER  
		},
		rejected: {
		type: DataTypes.INTEGER  
		},
        delivery_code: {
		type: DataTypes.TEXT  
		},
        delivery_man: {
		type: DataTypes.TEXT  
		},
        delivery_man_id: {
		type: DataTypes.TEXT  
		},
		company_id: {
		type: DataTypes.TEXT  
		},
        cancel_id: {
		type: DataTypes.INTEGER  
		},
	    created_at: {
		type: DataTypes.TEXT
		},
		updated_at: {
		type: DataTypes.TEXT
		}
	}, {
	    timestamps: false,
	    tableName: 'logistics'
	});
    logistic.sync()
    logistic.associate = function(models) {
  };
	return logistic;
}