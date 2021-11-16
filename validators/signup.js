let validator = require('validator');
let models = require('../models')

const validateCreateUserFields = (errors, req) => {
	if(!validator.isEmail(req.body.email)){
		errors['error'] = 'Please use a valid email';
	}
	if(!validator.isAscii(req.body.password)){
		errors['error'] = 'Invalid characters in password please try another';
	}
	if(!validator.isLength(req.body.password, {min: 8, max: 30})){
		errors['error'] = 'Please ensure that your password has a minimum of 8 characters';
	}
} 

 exports.validateUser = (errors, req) => {
 	return new Promise((resolve, reject) => {
 		validateCreateUserFields(errors, req);
 		return models.user.findOne({
		where: {
			email: req.body.email
		}
	}).then(usr => {
	if(usr){
		errors["error"] = "Email is already in Use"
	}
	resolve(errors)
	
 	})
	
})
}

