'use strict';
module.exports = (sequelize, DataTypes) => {
	var sub = sequelize.define('sub', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		title: {
		type: DataTypes.STRING
		},
		cat_id: {
    	  type: DataTypes.INTEGER,
            allowNull: false,
            references: {  
              model: 'cats',
              key: 'id'
            }
		}
	});
    sub.sync()
    sub.associate = function(models) {
    sub.belongsTo(models.car, {foreignKey: "cat_id", as: "cat"})
  };
	return sub;
}