'use strict';
module.exports = (sequelize, DataTypes) => {
	var top = sequelize.define('top', {
		id: {
			type: DataTypes.INTEGER,
			allowNull: false,
			primaryKey: true,
			autoIncrement: true
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
    top.sync()
    top.associate = function(models) {
    top.belongsTo(models.part, {foreignKey: "part_id", as: "part"})
  };
	return top;
}