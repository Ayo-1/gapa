'use strict';
module.exports = (sequelize, DataTypes) => {
	var review = sequelize.define('review', {
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
		},
		review: {
		type: DataTypes.STRING
		},
		rating: {
		type: DataTypes.INTEGER
		}
		
	});
    review.sync()
    review.associate = function(models) {
    review.belongsTo(models.user, {foreignKey: "user_id", as: "user"})
    review.belongsTo(models.part, {foreignKey: "part_id", as: "part"})
  };
	return review;
}