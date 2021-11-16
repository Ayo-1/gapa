'use strict';
module.exports = (sequelize, DataTypes) => {
	var mailing = sequelize.define('mailing', {
		id: {
			type: DataTypes.INTEGER,
			autoIncrement: true,
			allowNull: false,
			primaryKey: true
		},
		email: {
		type: DataTypes.STRING,
		unique: true
		}
	});
    mailing.sync()
    mailing.associate = function(models) {
  };
	return mailing;
}