'use strict';
module.exports = (sequelize, DataTypes) => {
	var featured = sequelize.define('featured', {
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
		},
		category: {
		 type: DataTypes.TEXT
		}
		
	});
    featured.sync()
    featured.associate = function(models) {
    featured.belongsTo(models.part, {foreignKey: "part_id", as: "part"})
  };
	return featured;
}