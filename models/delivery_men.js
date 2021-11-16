'use strict';
module.exports = (sequelize, DataTypes) => {
	var delivery_men = sequelize.define('delivery_men', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		company_id: {
		type: DataTypes.INTEGER
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
	    image: {
		type: DataTypes.TEXT  
		},
		email_verified_at: {
		type: DataTypes.TEXT  
		},
		state: {
		type: DataTypes.TEXT  
		},
		today: {
		type: DataTypes.INTEGER  
		},
		this_month: {
		type: DataTypes.INTEGER  
		},
		last_month: {
		type: DataTypes.INTEGER  
		},
		total_amount: {
		type: DataTypes.INTEGER  
		},
        password: {
		type: DataTypes.TEXT  
		},
	    created_at: {
		type: DataTypes.TEXT
		},
		updated_at: {
		type: DataTypes.TEXT
		}
	}, {
	    timestamps: false,
	    tableName: 'delivery_men'
	});
    delivery_men.sync()
    delivery_men.associate = function(models) {
  };
	return delivery_men;
}