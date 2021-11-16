'use strict';
module.exports = (sequelize, DataTypes) => {
	var user = sequelize.define('user', {
		id: {
			type: DataTypes.UUID,
			defaultValue: DataTypes.UUIDV4,
			allowNull: false,
			primaryKey: true
		},
		firstName: {
		type: DataTypes.STRING
		},
		lastName: {
		type: DataTypes.STRING
		},
		email: {
		type: DataTypes.STRING,
		unique: true
		},
		password: {
		type: DataTypes.STRING
		},
		emailVerified: {
		type: DataTypes.BOOLEAN,
		defaultValue: false
		},
		token: {
		 type: DataTypes.STRING
		}, 
		img_url: {
		 type: DataTypes.STRING,
		 defaultValue: "/img/profile.png"
		}, 
		phone: {
		type: DataTypes.STRING
		},
		status: {
		type: DataTypes.STRING,
		defaultValue: "open"
		},
	    bal: {
	    type: DataTypes.INTEGER
	    },
	    address: {
	    type: DataTypes.TEXT
	    },
	    address_2: {
	    type: DataTypes.TEXT
	    },
	    zip_code: {
	    type: DataTypes.STRING
	    },
	    state: {
	    type: DataTypes.STRING
	    },
	    cart: {
	    type: DataTypes.INTEGER,
	    defaultValue: 0
	    },
	    referral_code: {
	    type: DataTypes.TEXT
	    }
	    
	});
    user.sync()
    user.associate = function(models) {
  };
	return user;
}