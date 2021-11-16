'use strict';
module.exports = (sequelize, DataTypes) => {
	var item = sequelize.define('item', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
		},
		amount: {
		type: DataTypes.INTEGER
		},
		quantity: {
		type: DataTypes.INTEGER
		},
	    order_id: {
    	  type: DataTypes.UUID,
            allowNull: false,
            references: {  
              model: 'orders',
              key: 'id'
            }
		},
	    part_id: {
    	  type: DataTypes.UUID,
            allowNull: false,
            references: {  
              model: 'parts',
              key: 'id'
            }
		}
		
	});
    item.sync()
    item.associate = function(models) {
    item.belongsTo(models.order, {foreignKey: "order_id", as: "order"})
    item.belongsTo(models.part, {foreignKey: "part_id", as: "part"})
  };
	return item;
}