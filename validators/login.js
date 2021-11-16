let validator = require('validator');
let models = require('../models');
const bcrypt = require('bcrypt')
var Sequelize = require("sequelize")
var Op = Sequelize.Op

const validateCreateUserField = (errors, req) => {
// 	if(!validator.isEmail(req.body.email)){
// 		errors['error'] = 'Please use a valid email';
// 	}
	if(!validator.isAscii(req.body.password)){
		errors['error'] = 'Invalid characters in password please try another';
	}
} 

 exports.validateLogin = (errors, req) => {
 	return new Promise((resolve, reject) => {
 		validateCreateUserField(errors, req); 
 		var nums = req.body.email.split("")
 		var phn;
         console.log(nums)
        if(nums[0] == "+"){
        if(nums[0] == "+" && nums[1] == "2" && nums[2] == "3" ){
            var phn = req.body.email
        }
        else {
            
            var phn = req.body.email
            
        }
        
        }else if(nums[0] == "0") {
            nums.shift()
        
        nums.unshift("+","2","3","4")
        var phn = nums.join('')
             console.log(phn, "ayom")
        }
        else {
            var phn = req.body.email
            console.log(phn)
        }
 		return models.user.findOne({
		where: {
		    [Op.or]: [{email: req.body.email}, {phone: phn }]
		}
	}).then(usr => {
	if(!usr){
	    
	            errors["error"] = "Invalid Login Details"

		
	}
	else if(!bcrypt.compareSync(req.body.password, usr.password)){
		errors["error"] = "Invalid Login Details"
	}
// 	}
// 	else if(usr.status == "blocked"){
// 		errors["error"] = "Account Suspended Please Contact Support"
// 	}
	resolve(errors)
 	})
	
})
}

 exports.validateLoginInvestor = (errors, req) => {
 	return new Promise((resolve, reject) => {
 		validateCreateUserField(errors, req);
 		return models.investor.findOne({
		where: {
			email: req.body.email
		}
	}).then(usr => {
	if(!usr){
	    
		errors["error"] = "Invalid Login Details"
	}
	else if(!bcrypt.compareSync(req.body.password, usr.password)){
		errors["error"] = "Invalid Login Details"
	}
// 	}
// 	else if(usr.status == "blocked"){
// 		errors["error"] = "Account Suspended Please Contact Support"
// 	}
	resolve(errors)
 	})
	
})
}