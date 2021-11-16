'use strict';
module.exports = (sequelize, DataTypes) => {
	var order = sequelize.define('order', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
    status: {
    type: DataTypes.STRING
    },
    delivery_date: {
    type: DataTypes.STRING
    },
    delivery_address: {
    type: DataTypes.STRING
    },
    shipping_cost: {
    type: DataTypes.TEXT
    },
    state: {
    type: DataTypes.STRING
    },
    phone: {
    type: DataTypes.STRING
    },
    total_paid: {
    type: DataTypes.INTEGER
    },
    type: {
    type: DataTypes.STRING
    },
    txn_id: {
    type: DataTypes.STRING
    },
    comment: {
    type: DataTypes.TEXT
    },
	user_id: {
    	  type: DataTypes.UUID,
            allowNull: false,
            references: {  
              model: 'users',
              key: 'id'
            }
		},
	delivery_id: {
	type: DataTypes.INTEGER
	}
	});
    order.sync()
    order.associate = function(models) {
    order.hasMany(models.item, {foreignKey: "order_id", as: "items"})
    order.belongsTo(models.user, {foreignKey: "user_id", as: "user"})
  };
	return order;
}