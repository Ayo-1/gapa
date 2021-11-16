'use strict';
module.exports = (sequelize, DataTypes) => {
	var wish = sequelize.define('wish', {
		id: {
    			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
	user_id: {
    	  type: DataTypes.UUID,
            allowNull: false,
            references: {  
              model: 'users',
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
    wish.sync()
    wish.associate = function(models) {
    wish.belongsTo(models.user, {foreignKey: "user_id", as: "user"})
    wish.belongsTo(models.part, {foreignKey: "part_id", as: "part"})
  };
	return wish;
}