'use strict';
module.exports = (sequelize, DataTypes) => {
	var admin = sequelize.define('admin', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		name: {
		type: DataTypes.STRING
		},
		email: {
		type: DataTypes.STRING,
		unique: true
		},
		password: {
		type: DataTypes.STRING
		},
		img_url: {
		 type: DataTypes.STRING,
		 defaultValue: "/img/profile.png"
		}, 
		phone: {
		type: DataTypes.STRING
		},
		role: {
		type: DataTypes.STRING
		}
	});
    admin.sync()
  
	return admin;
}