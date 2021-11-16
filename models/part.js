'use strict';
module.exports = (sequelize, DataTypes) => {
	var part = sequelize.define('part', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		name: {
		type: DataTypes.STRING
		},
		description: {
		type: DataTypes.TEXT
		},
		img_url: {
		type: DataTypes.STRING
		},
		img_url_1: {
		type: DataTypes.STRING
		},
		img_url_2: {
		type: DataTypes.STRING
		},
		price: {
		type: DataTypes.INTEGER
		},
		discount: {
		type: DataTypes.INTEGER
		},
		category: {
		type: DataTypes.STRING
		},
	    model_id: {
    	  type: DataTypes.INTEGER,
            allowNull: false,
            references: {  
              model: 'models',
              key: 'id'
            }
		},
		maker_id: {
    	  type: DataTypes.INTEGER,
            allowNull: false,
            references: {  
              model: 'makers',
              key: 'id'
            }
		},
		available: {
	    type: DataTypes.BOOLEAN,
	    defaultValue: true
		},
		stock: {
		type: DataTypes.INTEGER
		},
		weight_in_kg: {
		type: DataTypes.TEXT
		},
		car_id: {
        type: DataTypes.STRING 
		},
		brand_id: {
		type: DataTypes.STRING		    
		},
		year: {
		type: DataTypes.INTEGER		    
		},
		year_2: {
		type: DataTypes.INTEGER		    
		},
		product_code: {
		type: DataTypes.STRING
		}
		
	});
    part.sync()
    part.associate = function(models) {
    part.belongsTo(models.model, {foreignKey: "model_id", as: "model"})
    part.belongsTo(models.maker, {foreignKey: "maker_id", as: "maker"})
    part.hasMany(models.review, {foreignKey: "part_id", as: "reviews"})
  };
	return part;
}