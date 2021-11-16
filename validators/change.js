let validator = require('validator');
let models = require('../models');
const bcrypt = require('bcrypt')

const validateCreateUserField = (errors, req) => {
	if(!validator.isLength(req.body.pass, {min: 8, max: 30})){
		errors['error'] = 'Please ensure that your password has a minimum of 8 characters';
	}
		if(!validator.isAscii(req.body.pass)){
		errors['error'] = 'Invalid characters in password';
	}
} 

 exports.validateChange = (errors, req) => {
 	return new Promise((resolve, reject) => {
 		validateCreateUserField(errors, req);

	resolve(errors)
 
	
})
}