 const cryptoRandomString = require('crypto-random-string');
var bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken')
const passport = require("passport")
const myPassport = require('../passport_setup')(passport)
var models = require("../models")
var Sequelize = require("sequelize")
const {isEmpty} = require('lodash')
const nodemailer = require("nodemailer")
const {validateUser, validateInvestor} = require("../validators/signup");
const {validateLogin, validateLoginInvestor} = require("../validators/login")
const {validateChange} = require("../validators/change")
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
var util = require('util');
var logFile = fs.createWriteStream('log.txt', { flags: 'a' });
  // Or 'w' to truncate the file every time the process starts.
var logStdout = process.stdout;

console.log = function () {
  logFile.write(util.format.apply(null, arguments) + '\n');
  logStdout.write(util.format.apply(null, arguments) + '\n');
}
console.error = console.log;
const formidable = require('formidable');
var moment = require("moment")
const cron =  require("node-cron")
var {mail} = require("./mail")
var geodist = require('geodist')
const AfricasTalking = require('africastalking');
// TODO: Initialize Africa's Talking
const africastalking = AfricasTalking({
  apiKey: '795bbe4af0239786441268f6c723950ca10f1408e66a3775d6e8b61d6a86b85a', 
  username: 'century21'
});

const axios = require("axios")

async function sendSMS(num, msg) {
    
    try {
  const result = await africastalking.SMS.send({
    to: num, 
    message: msg
  });
  console.log(result);
} catch(ex) {
  console.error(ex);
} 
};

var cur = "&#8358;"
const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads/');
    },

    // By default, multer removes file extensions so let's add them back
    filename: function(req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

        const imageFilter = function(req, file, cb) {
    // Accept images only
    if (!file.originalname.match(/\.(jpg|JPG|jpeg|JPEG|png|PNG|gif|GIF)$/)) {
        req.fileValidationError = 'Only image files are allowed!';
        return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
    };
    // 'profile_pic' is the name of our file input field in the HTML form
    let upload = multer({ storage: storage, fileFilter: imageFilter, limits: { fileSize: 2 * 1000 * 1000 }}).single('profile_pic'); 
    
    
const sendMail = (email, subject, page) => {
const transporter = nodemailer.createTransport({sendmail: true}, {
  from: "Suppport@GAPANAIJA.com",
  to: email,
  subject: subject,
});
transporter.sendMail({html: page}, (error, info) => {
     if (error) {
	console.log(error);
  } else {
    console.log('Email sent: ' + info.response);
  }
})
}


exports.show_index = function(req, res, next){
models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
models.cat.findAll().then(categories => {
models.setting.findAll().then(settings => {
models.part.findAll().then(parts => {
    models.car.findAll().then(cars => {
    models.top.findAll({include: [{association: "part", as: "part", include: ["reviews"]}]}).then(top => {
        models.featured.findAll({where: {category: "wheels"},include: [{association: "part", as: "part", include: ["reviews"]}], limit: 7}).then(featured_wheels => {
            models.featured.findAll({where: {category: "engine"},include: [{association: "part", as: "part", include: ["reviews"]}], limit: 7}).then(featured_engine => {
                models.featured.findAll({where: {category: "brakes-system"},include: [{association: "part", as: "part", include: ["reviews"]}], limit: 7}).then(featured_brakes => {
    res.render("index", {title: "HOME | GAPANAIJA", user: req.user, brands, parts, featured_wheels, featured_engine, featured_brakes, top, cur, moment, cars, categories, settings}) 
            
        })
            })
            })
    })
        
    })
})
     
})
})
})   

}


exports.login =  (req, res, next) => {
    if(!req.body.email || !req.body.password){
        res.json({error: "Incomplete Login Details"})
    }
    else{
        models.user.findOne({where: {email: req.body.email}}).then(user => {
            if(user){
                		var errors = {}
	return validateLogin(errors, req).then(errors => {
		if(!isEmpty(errors)){
			res.json(errors)
		}else{
                             	passport.authenticate('local', function(err, user, info) {
                                if (err) { return res.json({error: "there was an error authenticating"})}
                                if (!user) { return res.json({error: "there was an error authenticating"}) }
                                req.logIn(user, function(err) {
                                res.json({message: "Authentication successful", path: req.query.ref ? req.query.ref : "/parts"})
                                });
                              })(req, res, next)
		}
                            	})
	
	
            }
            else {
     var nums = req.body.email.split("")
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
                                     console.log(phn)
                                }else {
                                    var phn = req.body.email
                                }
    	models.user.findOne({where: {phone: phn}}).then(user => {
    	    if(user){
                            		var errors = {}
	return validateLogin(errors, req).then(errors => {
		if(!isEmpty(errors)){
			res.json(errors)
		}else{
                             	passport.authenticate('local', function(err, user, info) {
                                if (err) { return res.json({error: "there was an error authenticating"})}
                                if (!user) { return res.json({error: "there was an error authenticating"}) }
                                req.logIn(user, function(err) {
                                res.json({message: "Authentication successful", path: req.query.ref ? req.query.ref : "/parts"})
                                });
                              })(req, res, next)
		}
                            	})
    	    }else {
        res.json({
        	error: "Incorrect Login Details"
        })
    	        
    	    }
    	})
        }
            
        })
    }
}
exports.show_login = (req, res, next) => {
    models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
        models.cat.findAll().then(categories => {
            models.setting.findAll().then(settings => {
     if(!req.query.ref){
        res.render("login", {title: "LOGIN | GAPANAIJA", user: req.user, cur, brands, ref: null, categories, settings})
        }else {
            res.render("login", {title: "LOGIN | GAPANAIJA", user: req.user, cur, brands, ref: req.query.ref, categories, settings})
        }
            
})
   
    })
    })
}
exports.show_register = (req, res, next) => {
     models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
         models.cat.findAll().then(categories => {
            models.setting.findAll().then(settings => {
         if(!req.query.ref){
            res.render("register", {title: "REGISTER | GAPANAIJA", user: req.user, cur, brands, ref: null, categories, settings})
         }else {
             res.render("register", {title: "REGISTER | GAPANAIJA", user: req.user, cur, brands, ref: req.query.ref, categories,settings})
         }    
})
    })
     })

}
exports.get_account = (req, res, next) => {
      models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
          models.cat.findAll().then(categories => {
             models.setting.findAll().then(settings => {
            res.render("account", {title: "MY ACCOUNT | GAPANAIJA", user: req.user, cur, brands, categories, settings})
             })
})
         
    })
}
exports.register = function(req, res, next){
    if(!req.body.email || !req.body.password || !req.body.fname || !req.body.lname || !req.body.phone){
     res.json({error: "Incomplete details provided"})   
    }
else{
			                    
			                     var nums = req.body.phone.split("")
                                 console.log(nums)
                                if(nums[0] == "+"){
                                if(nums[0] == "+" && nums[1] == "2" && nums[2] == "3" ){
                                    var phn = req.body.phone
                                }
                                else {
                                    
                                    var phn = req.body.phone
                                    
                                }
                                
                                }else if(nums[0] == "0") {
                                    nums.shift()
                                
                                nums.unshift("+","2","3","4")
                                var phn = nums.join('')
                                     console.log(phn)
                                }
			const hash = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
			var token = cryptoRandomString({length: 6, type: 'numeric'})
            if(req.body.ref){
                models.user.findOne({where: {referral_code: req.body.ref}}).then(reff => {
                    if(reff){
                        models.user.update({
                            bal: reff.bal + 2
                        }, {where: {
                            id: reff.id
                        }})
                    }
                })
            }
                                      var data = {
                    			    	firstName: req.body.fname,
                    			    	lastName: req.body.lname,
                    			        phone: phn,
                        				email: req.body.email,
                        				password: hash,
                        				token: token,
                        				img_url: "/img/profile.png",
                        				address: req.body.address,
                        				referral_code: cryptoRandomString({length: 4, type: 'distinguishable'}) + "-" + cryptoRandomString({length: 4, type: 'numeric'})
                    			        }
                                let errors = {};
                        	return validateUser(errors, req).then(errors => {
                        		if(!isEmpty(errors)){
                        			res.json(errors)
                        		}
                        		
                        		
                        		else{
                        		    
                        		    models.user.findOne({where: {phone: phn}}).then(ph => {
                        		        if(ph){
                        		            return res.json({
                        		                error: "A user with this phone number is already registered"
                        		            })
                        		        }else {
                        		            
                        			      return models.user.create(data).then(user => {
                        		            	if(user){
                        		            	   console.log(user);
                                                     	passport.authenticate('local', function(err, user, info) {
                                                        if (err) { return res.json({error: "there was an error registering"})}
                                                        if (!user) { return res.json({error: "there was an error registering"}) }
                                                        
                                                        req.logIn(user, function(err) {
                                                        res.json({message: "Registration successful", path: req.query.ref? '/verify-email?ref=' + req.query.ref : '/verify-email'})
                                                        });
                                                      })(req, res, next)
                                                    
                                                        sendMail(user.email, "Email verification", `Hi ${user.firstName}, You have successfully signed up to Gapaautoparts.Your verification token is ${user.token}`)
                                                        sendSMS(user.phone, `Hi ${user.firstName}, You have successfully signed up to Gapaautoparts. Your verification token is ${user.token}`)
                        			
                        			
                        			}
                        
                        			})
                        		        }
                        		    })
                        		  
                        			.catch(err => {
                        
                        				if(err){
                        					console.log(err);
                        					res.json({error: "there was an error", err})
                        				}
                        
                        			})	  
                        		}
                        		
                        		
                        		})



		
		}
			


}

exports.show_verify = (req, res, next) => {
    
     models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
         models.cat.findAll().then(categories => {
            models.setting.findAll().then(settings => {
          if(!req.query.ref){
            res.render("verify", {title: "VERIFY ACCCOUNT | GAPANAIJA", user: req.user, brands, ref: null, categories, settings, cur}) 
         }else {
             res.render("verify", {title: "VERIFY ACCCOUNT | GAPANAIJA", user: req.user, brands, ref: req.query.ref, categories, settings, cur}) 
         }
           
})
})
    })

}

exports.get_forgot = (req, res, next) => {
        models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
         models.cat.findAll().then(categories => {
            models.setting.findAll().then(settings => {
         if(!req.query.ref){
            res.render("forgot_pass", {title: "FORGOT PASSWORD | GAPANAIJA", user: req.user, cur, brands, ref: null, categories, settings})
         }else {
             res.render("forgot_pass", {title: "FORGOT PASSWORD | GAPANAIJA", user: req.user, cur, brands, ref: req.query.ref, categories,settings})
         }    
})
    })
     })

}

exports.forgot = (req, res, next) => {
    if(req.body.email){
        models.user.findOne({where: {email: req.body.email}}).then(usr => {
            if(usr){
               var token = cryptoRandomString({length: 7, type: 'numeric'})
               models.user.update({token: token},{where: {id: usr.id}}).then(rows => {
                  sendMail(usr.email, "Password Reset", `Hi ${usr.firstName}, You have Requested to Change Your Password on Gapaautoparts. Your OTP is ${token}`)
                  sendSMS(usr.phone, `Hi ${usr.firstName}, You have Requested to Change Your Password on Gapaautoparts. Your OTP is ${token}`)
                        			    			
                   res.json({
                       message: "Sent"
                   })
               })
            }else {
                res.json({
                    error: "This Email wasn't found in our database"
                })
            }
        })
    }
    else {
        res.json({
            error: "Please Provide Account Email"
        })
    }
}

exports.reset_pass2 = (req, res, next) => {
      if(req.body.pass && req.body.pass2 && req.body.token){
        var tok = req.body.token
        if(req.body.pass != req.body.pass2){
         res.status(400).json({
             error: "Passwords do not match"
         })   
        }
        else {
                   let errors = {}
                   return validateChange(errors, req).then(errors => {
                        		if(!isEmpty(errors)){
                        			res.status(400).json(errors)
                        		}
                        		
                        		
                        		else{
                        		     models.user.findOne({where: {token: tok}}).then(usr => {
                        		         if(!usr){
                        		             return res.status(400).json({
                        		                 error: "Invalid Token Provided"
                        		             })
                        		         }
                        		            models.user.update({password: bcrypt.hashSync(req.body.pass, bcrypt.genSaltSync(10))}, {where: {id: usr.id}}).then(rows => {
                        		      models.user.update({token: "******"}, {where: {id: usr.id}})
                        		          res.json({
                        		              message: "Password Reset succesfully"
                        		          })
                        		      })
                        		     })
                        		   
                        		    
                        		}
                        		
                        		
                        		})
        }
    }
    else {
      res.status(400).json({
          error: "Please Provide Password reset token, New password and password confirmation"
      })  
    }
}

    exports.verify = function(req, res, next){
   if(!req.body.tok){
       res.json({error: "Incomplete details provided"})
   }
   else{
       models.user.findOne({where: {token: req.body.tok}}).then(usr => {
           if(!usr){
               res.json({error: "Invalid token provided"})
           }else if(usr){
               models.user.update({emailVerified: true, token: "******"}, {where: {id: usr.id}}).then((rows) => {
                   if(rows){
                       res.json({message: "email verification successful", path: req.query.ref ? req.query.ref : "/parts"})
                       
                   }
                   else{
                       res.json({error: "an error occurred please try again"})
                   }
               })
           }
       })
       
       
       
   }
}


exports.get_products = (req, res, next) => {
    models.cat.findAll().then(categories => {
        models.setting.findAll().then(settings => {
    if(req.query.show){
        var limit = parseInt(req.query.show)
        if(typeof limit == "number"){
         models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
       models.part.findAll({limit: limit, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(parts => {
            models.part.findAll({limit: 5, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(newProd => {
        res.render("parts", {title: "PARTS | GAPANAIJA", user: req.user, parts, cur, moment, brands, newProd, categories, settings})
            })
    })   
    })
        }else {
    models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
       models.part.findAll({limit: 15, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(parts => {
            models.part.findAll({limit: 5, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(newProd => {
        res.render("parts", {title: "PARTS | GAPANAIJA", user: req.user, parts, cur, moment, brands, newProd, categories, settings})
            })
    })   
    })  
        }
    }else if(req.query.filter){
         models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
       models.part.findAll({limit: 15, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(parts => {
            models.part.findAll({limit: 5, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(newProd => {
        res.render("parts", {title: "PARTS | GAPANAIJA", user: req.user, parts, cur, moment, brands, newProd, categories, settings})
            })
    })   
    })
    }else {
     models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
       models.part.findAll({limit: 15, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(parts => {
            models.part.findAll({limit: 5, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(newProd => {
        res.render("parts", {title: "PARTS | GAPANAIJA", user: req.user, parts, cur, moment, brands, newProd, categories, settings})
            })
    })   
    })
    }
      
})
})
}

exports.get_parts = (req, res, next) => {
        models.cat.findAll().then(categories => {
        models.setting.findAll().then(settings => {
        var limit = req.query.show? parseInt(req.query.show) : 100
        if(req.query.page){
    // var limit = 2
let offset = 0 + (req.query.page - 1) * limit
var x = offset + 1
if(req.body.filter){
    if(req.query.filter == "high_to_low"){
        var orders = ["price", 'DESC']
    }else if(req.query.filter == "low_to_high") {
        var orders = ["price", 'ASC']
    }
    else if(req.query.filter == "a_to_z") {
        var orders = ["name", 'ASC']
    }
    else if(req.query.filter == "z_to_a") {
        var orders = ["name", 'DESC']
    }else {
      var orders = ["createdAt", 'DESC']  
    }
}else {
    var orders = ["createdAt", 'DESC']
}
models.part.findAndCountAll({
        offset: req.query.page == 1 ? 0 : offset,
        limit: limit,
        order: [orders],
        include: ["reviews"]
    }).then(parts => {
        if(parts.count - x > 9){
            var final = false
        }
        else{
            var final = true
        }
        var totalPages = Math.ceil(parts.count / limit);
                 models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
            models.part.findAll({limit: 5, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(newProd => {
        res.render("parts", {title: "PARTS | GAPANAIJA", user: req.user, parts: parts.rows, brands, newProd, categories, settings, currentPage: req.query.page, final: final, length: parts.count, moment, cur, totalPages, query1: req.query.filter || null, query2: req.query.page || null}) 
            })
    })
            

        
    })
    }
    else{
        //   var limit = 2
let offset = 0 + (1 - 1) * limit
var x = offset + 1
if(req.query.filter){
    if(req.query.filter == "htl"){
        var orders = ["price", 'DESC']
    }else if(req.query.filter == "low_to_high") {
        var orders = ["price", 'ASC']
    }
    else if(req.query.filter == "a_to_z") {
        var orders = ["name", 'ASC']
    }
    else if(req.query.filter == "z_to_a") {
        var orders = ["name", 'DESC']
    }else {
      var orders = ["createdAt", 'DESC']  
    }
}else {
    var orders = ["createdAt", 'DESC']
}
    models.part.findAndCountAll({ limit: limit, order: [orders], include: ["reviews"]
        }).then(parts => {
        if(parts.count - x > 9){
            var final = false
        }
        else{
            var final = true
        }
        var totalPages = Math.ceil(parts.count / limit);
                           models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
            models.part.findAll({limit: 5, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(newProd => {
        res.render("parts", {title: "PARTS | GAPANAIJA", user: req.user, parts: parts.rows, brands, newProd, categories, settings, currentPage: 1, final: final, length: parts.count, moment, cur, totalPages, query1: req.query.filter || null, query2: req.query.page || null}) 
            })
    })

        
        
    })
    
    }
        })
        })
}

exports.get_product  = (req, res, next) => {
     models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
         models.cat.findAll().then(categories => {
            models.setting.findAll().then(settings => {
            models.part.findOne({where: {id: req.params.id}, include: [{association: "model", as: "model", include: [{association: "car",as: "car", include: ["brand"]}]},"maker", {association: "reviews", as: "reviews", include: ["user"]}]}).then(part => {
        if(part){
                 models.part.findAll({limit: 5, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(newProd => {
                     
            res.render("part", {title: "PART | GAPANAIJA", user: req.user, cur, part, cur, moment, brands, newProd, categories, settings})
            
                 })
        }else {
        res.redirect("/parts")
        }
    })    
})
})
    })

}

exports.get_cart = (req, res, next) => {
        models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
            models.cat.findAll().then(categories => {
                models.setting.findAll().then(settings => {
        res.render("cart", {title: 'MY CART | GAPANAIJA', user: req.user, moment, cur, brands, categories, settings})
    
})
})
        })

}

exports.get_checkout = (req, res, next) => {
        models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
            models.cat.findAll().then(categories => {
                models.setting.findAll().then(settings => {
        res.render("checkout", {title: 'Checkout | GAPANAIJA', user: req.user, moment, cur, brands, cryptoRandomString, categories, settings})
    
})
        })
        })

}


exports.get_items = (req, res, next) => {
    if(req.body.products.length > 0){
        var items = []
        req.body.products.forEach((product, id, arr) => {
        if(id + 1 == arr.length){    
    models.part.findOne({where: {id: product.id}, include: [{association: "model", as: "model", include: [{association: "car", as: "car", include: ["brand"]}]}]}).then(item => {
        if(item){
        items.push(item)
        res.json({
            items
        })
        }
        else {
            res.json({
                error: "No Items"
            })
        }
        })
        }else {
             models.part.findOne({where: {id: product.id}, include: [{association: "model", as: "model", include: [{association: "car", as: "car", include: ["brand"]}]}]}).then(item => {
        if(item){
        items.push(item)
        }
        })   
        }
        })
    }else {
        res.json({
            items: []
        })
    }
}
exports.send_review = (req, res, next) => {
    if(req.body.review && req.body.id && req.body.rating){
        models.review.create({user_id: req.user.id, part_id: req.body.id, review: req.body.review, rating: req.body.rating}).then(review => {
            res.json({
                message: "Review Sent"
            })
        })
    }else {
        res.json({
            error: "Please Provide Full Details"
        })
    }
}

exports.order = (req, res, next) => {
    if(req.body.items && req.body.items.length > 0 && req.body.payment_id && req.body.type && req.body.address && req.body.amount && req.body.user_id && req.body.comment){
       
        if(req.body.type == "delivery"){
                    models.order.create({user_id: req.user.id || req.body.user_id, state: req.body.state, delivery_address: req.body.address, total_paid: req.body.amount, type: "delivery", status: "pending", txn_id: req.body.payment_id, commment: req.body.comment, shipping_cost: req.body.ship}).then(order => {
                       
                       req.body.items.forEach((item, id)=> {
                           models.part.findOne({where: {id: item.id}}).then(part => {
                        if(id + 1 == req.body.items.length){
                             models.item.create({order_id: order.id, part_id: item.id, amount: item.amount, quantity: item.quantity}).then(itm => {
                                 models.part.update({stock: parseInt(part.stock) - parseInt(item.quantity)},{where: {id: part.id}})
                                 res.json({
                                     message: "order placed successfully",
                                     path: "/orders/" + order.id
                                 })
                             })
                        }else {
                           models.item.create({order_id: order.id, part_id: item.id, amount: item.amount, quantity: item.quantity})
                        }
                            })
                       })
                        })
                }
                if(req.body.type == "pickup"){
                    models.order.create({user_id: req.user.id || req.body.user_id, state: req.body.state, delivery_address: req.body.address, total_paid: req.body.amount, type: "pickup", status: "pending", txn_id: req.body.payment_id, commment: req.body.comment, shipping_cost: req.body.ship}).then(order => {
                       
                       req.body.items.forEach((item, id)=> {
                        models.part.findOne({where: {id: item.id}}).then(part => {
                        if(id + 1 == req.body.items.length){
                             models.item.create({order_id: order.id, part_id: item.id, amount: item.amount, quantity: item.quantity}).then(itm => {
                                 models.part.update({stock: parseInt(part.stock) - parseInt(item.quantity)},{where: {id: part.id}})
                                 res.json({
                                     message: "order placed successfully",
                                     path: "/orders/" + order.id
                                 })
                             })
                        }else {
                           models.item.create({order_id: order.id, part_id: item.id, amount: item.amount, quantity: item.quantity})
                        }
                            })
                       })
                        })
                }                
       
    }else {
        res.json({
            error: "Please Provide full details"
        })
    }
}

exports.get_orders = (req, res, next) => {
    models.order.findAll({where: {user_id: req.user.id},order: [["createdAt", "DESC"]], include: [{association: "items", as: "items", include: [{association: "part", as: "part", include: [{association: "model", as: "model", include: [{association: "car", as: "car", include: ["brand"]}]}] }]}]}).then(orders => {
        models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
            models.cat.findAll().then(categories => {
                models.setting.findAll().then(settings => {
        res.render("orders", {title: "ORDERS || GAPANAIJA", user: req.user, orders, moment, cur, brands, categories, settings})
                })
})
        })
    })
}

exports.get_order = (req, res, next) => {
    models.order.findOne({where: {id: req.params.id, user_id: req.user.id}, include: [{association: "items", as: "items", include: [{association: "part", as: "part", include: [{association: "model", as: "model", include: [{association: "car", as: "car", include: ["brand"]}]}] }]}]}).then(order => {
        if(order){
        models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
            models.cat.findAll().then(categories => {
                models.setting.findAll().then(settings => {
        res.render("order", {title: "ORDER DETAILS || GAPANAIJA", order, moment, user: req.user, cur, brands, categories, settings})
                })
    
})
        })
           
        }
        else {
            res.redirect("/orders")
        }
    })
}
const Op = Sequelize.Op;
exports.search = (req, res, next) => {
    models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
        models.setting.findAll().then(settings => {
      if(req.query.make || req.query.model || req.query.year){
          
         if(req.query.make && req.query.model && req.query.year){
               var data = {
            [Op.or]: [{ [Op.or]: [{ year: parseInt(req.query.year)}, {year_2: parseInt(req.query.year)} ]},{ [Op.and]: [{year: {[Op.lt]: parseInt(req.query.year)}},{ year_2: {[Op.gt]: parseInt(req.query.year)}}]}],
            model_id: req.query.model,
            brand_id: req.query.make
           } 
         }
         if(req.query.make && req.query.model && !req.query.year){
               var data = {
            model_id: req.query.model,
            brand_id: req.query.make
           } 
         }
        if(!req.query.make && req.query.model && req.query.year){
               var data = {
            model_id: req.query.model,
            [Op.or]: [{ [Op.or]: [{ year: parseInt(req.query.year)}, {year_2: parseInt(req.query.year)} ]},{ [Op.and]: [{year: {[Op.lt]: parseInt(req.query.year)}},{ year_2: {[Op.gt]: parseInt(req.query.year)}}]}]
           } 
         }
         if(req.query.make && !req.query.model && req.query.year){
               var data = {
            year: {
                [Op.or]: [req.query.year, {[Op.like]: `%${req.query.year}`}]
            },
            brand_id: req.query.make
           } 
         }
         if(!req.query.make && req.query.model && !req.query.year){
               var data = {
            model_id: req.query.model,
           } 
         }
         
         if(!req.query.make && req.query.model && !req.query.year){
               var data = {
            model_id: req.query.model,
           } 
         }
         if(req.query.make && !req.query.model && !req.query.year){
               var data = {
            brand_id: req.query.make
           } 
         }
         if(!req.query.make && !req.query.model && req.query.year){
               var data = {
                [Op.or]: [{ [Op.or]: [{ year: parseInt(req.query.year)}, {year_2: parseInt(req.query.year)} ]},{ [Op.and]: [{year: {[Op.lt]: parseInt(req.query.year)}},{ year_2: {[Op.gt]: parseInt(req.query.year)}}]}]
           } 
         }
            models.cat.findAll().then(categories => {
        models.part.findAll({where: data, include: ["reviews"]}).then(parts => {
        models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
            if(parts.length > 0){
                
            res.render("search", {title: "SEARCH || GAPANAIJA", user: req.user, parts: parts, cur, moment, brands, newProd, categories, settings})
            }else {
                
            res.render("search", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings})
                
            }
            
        })
        })
            })
        
        }

    else {
        models.cat.findAll().then(categories => {
             models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
         res.render("search", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings })
                 
             })})
    }   
    })
    })
   
}

exports.search_2 = (req, res, next) => {
    models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
        models.setting.findAll().then(settings => {
      if(req.query.prod){
      if(req.query.cat){    
      var data = {
        category: req.query.cat,
        name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + req.query.prod + '%')
       }
      }else {
          var data = {
        name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + req.query.prod + '%')
       }
      }
            models.cat.findAll().then(categories => {
        models.part.findAll({where: data, include: ["reviews"]}).then(parts => {
        models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
            if(parts.length > 0){
                
            res.render("search", {title: "SEARCH || GAPANAIJA", user: req.user, parts: parts, cur, moment, brands, newProd, categories, settings})
            }else {
                
            res.render("search", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings})
                
            }
            
        })
        })
            })
        
        }

    else {
        models.cat.findAll().then(categories => {
             models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
         res.render("search", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings })
                 
             })})
    }   
    })
    })
}
exports.get_make = (req, res, next) => {
models.brand.findOne({where: {slug: req.params.slug}}).then(brand => {
    if(brand){
        models.car.findAll({where: {brand_id: brand.id}}).then(cars => {
                   models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
            models.cat.findAll().then(categories => {
                models.setting.findAll().then(settings => {
                  res.render("brand", {title: brand.name + " | GAPANAIJA", user: req.user, cars, brands, brand, categories, cur, moment, settings})
 
              })  
            })
            
       })
        })
    }else {
        res.redirect("/")
    }
})
}

exports.search_3 = (req, res, next) => {
    models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
        models.setting.findAll().then(settings => {
    if(req.query.type == "code" && req.query.code !== ""){
                              models.part.findAll({where: {product_code: req.query.code}, include: ["reviews"]}).then(parts => {
                         models.cat.findAll().then(categories => {
        models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
            if(parts.length > 0){
         
            res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: parts, cur, moment, brands, newProd, categories, settings,vin: {}})
            }else {
                
            res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings, vin: {}})
                
            }
            
        })
        })
                    })
    }
      else if(req.query.type == "vin" && req.query.vin){
          
    
    axios.get("https://api.carmd.com/v3.0/decode?vin="+req.query.vin, {
        headers: {
        "content-type": "application/json",
        "authorization": "Basic MWY1M2Y4NjEtODRhNi00MGFjLTk2NzEtNzIxMTRmMzdhNGRj",
        "partner-token": "beed38e8564a417a8b0706991fdfa24d"
        }
    }).then(resp => {
        if(resp.data.data){
            models.brand.findOne({
                where: {
                name:  Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + resp.data.data.make.toLowerCase() + '%')    
                }
            }).then(make => {
                if(make){
                models.model.findOne({where: {
                    name:  Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + resp.data.data.model.toLowerCase() + '%')
                }}).then(modl => {
                if(modl){
                      models.part.findAll({where: {brand_id: make.id, model_id: modl.id, [Op.or]: [{ [Op.or]: [{ year: req.query.year}, {year_2: req.query.year} ]},{ [Op.and]: [{year: {[Op.lt]: req.query.year}},{ year_2: {[Op.gt]: req.query.year}}]}] }, include: ["reviews"]}).then(parts => {
                         models.cat.findAll().then(categories => {
        models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
            if(parts.length > 0){
                
            res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: parts, cur, moment, brands, newProd, categories, settings, vin: resp.data.data})
            }else {
                
            res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings, vin: resp.data.data})
                
            }
            
        })
        })
                    })
                }else {
                    models.part.findAll({where: {brand_id: make.id}, include: ["reviews"]}).then(parts => {
                         models.cat.findAll().then(categories => {
        models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
            if(parts.length > 0){
                
            res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: parts, cur, moment, brands, newProd, categories, settings, vin: data.data})
            }else {
                
            res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings, vin: data.data})
                
            }
            
        })
        })
                    })
                }
                })
                  
                }else {
                      models.cat.findAll().then(categories => {
             models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
         res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings, vin: resp.data.data})
                 
             })})
                }
            })
        }else {
              models.cat.findAll().then(categories => {
             models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
         res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings, vin: null})
                 
             })})
        }
    }).catch(error => {
        if(error){
           models.cat.findAll().then(categories => {
             models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
         res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings, vin: null})
                 
             })})   
        }
    })
   
           
        
        }

    else {
        models.cat.findAll().then(categories => {
             models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
         res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings, vin: null})
                 
             })})
    }   
    })
    })
}
exports.search_4 = (req, res, next) => {
    models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
        models.setting.findAll().then(settings => {
    if(req.query.type == "name" && req.query.title !== ""){

          var data = {
        name: Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + req.query.title + '%')
       }
            models.cat.findAll().then(categories => {
        models.part.findAll({where: data, include: ["reviews"]}).then(parts => {
        models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
            if(parts.length > 0){
                
            res.render("search", {title: "SEARCH || GAPANAIJA", user: req.user, parts: parts, cur, moment, brands, newProd, categories, settings})
            }else {
                
            res.render("search", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings})
                
            }
            
        })
        })
            })        }

        else if(req.query.type == "code" && req.query.title !== ""){
                              models.part.findAll({where: {product_code: req.query.title}, include: ["reviews"]}).then(parts => {
                         models.cat.findAll().then(categories => {
        models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
            if(parts.length > 0){
         
            res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: parts, cur, moment, brands, newProd, categories, settings,vin: {}})
            }else {
                
            res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings, vin: {}})
                
            }
            
        })
        })
                    })
    }
      else if(req.query.type == "vin" && req.query.title){
          
    
    axios.get("https://api.carmd.com/v3.0/decode?vin="+req.query.title, {
        headers: {
        "content-type": "application/json",
        "authorization": "Basic MWY1M2Y4NjEtODRhNi00MGFjLTk2NzEtNzIxMTRmMzdhNGRj",
        "partner-token": "beed38e8564a417a8b0706991fdfa24d"
        }
    }).then(resp => {
        if(resp.data.data){
            models.brand.findOne({
                where: {
                name:  Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + resp.data.data.make.toLowerCase() + '%')    
                }
            }).then(make => {
                if(make){
                models.model.findOne({where: {
                    name:  Sequelize.where(Sequelize.fn('LOWER', Sequelize.col('name')), 'LIKE', '%' + resp.data.data.model.toLowerCase() + '%')
                }}).then(modl => {
                if(modl){
                      models.part.findAll({where: {brand_id: make.id, model_id: modl.id, year:  {[Op.or]: [resp.data.data.year, {[Op.like]: `%${resp.data.data.year}`}]} }, include: ["reviews"]}).then(parts => {
                         models.cat.findAll().then(categories => {
        models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
            if(parts.length > 0){
                
            res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: parts, cur, moment, brands, newProd, categories, settings, vin: resp.data.data})
            }else {
                
            res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings, vin: resp.data.data})
                
            }
            
        })
        })
                    })
                }else {
                    models.part.findAll({where: {brand_id: make.id}, include: ["reviews"]}).then(parts => {
                         models.cat.findAll().then(categories => {
        models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
            if(parts.length > 0){
                
            res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: parts, cur, moment, brands, newProd, categories, settings, vin: data.data})
            }else {
                
            res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings, vin: data.data})
                
            }
            
        })
        })
                    })
                }
                })
                  
                }else {
                      models.cat.findAll().then(categories => {
             models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
         res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings, vin: resp.data.data})
                 
             })})
                }
            })
        }else {
              models.cat.findAll().then(categories => {
             models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
         res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings, vin: null})
                 
             })})
        }
    }).catch(error => {
        if(error){
           models.cat.findAll().then(categories => {
             models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
         res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings, vin: null})
                 
             })})   
        }
    })
   
           
        
        }

    else {
        models.cat.findAll().then(categories => {
             models.part.findAll({limit: 5, order: [["createdAt", "DESC"]]}).then(newProd => {
         res.render("search_vin", {title: "SEARCH || GAPANAIJA", user: req.user, parts: [], cur, moment, brands, newProd, categories, settings, vin: null})
                 
             })})
    }   
    })
    })
}

exports.get_models = (req, res, next) => {
models.car.findOne({where: {id: req.params.id}, include: ["brand"]}).then(car => {
    if(car){
        models.model.findAll({where: {car_id: car.id}}).then(mods => {
                   models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
            models.cat.findAll().then(categories => {
                models.setting.findAll().then(settings => {
                  res.render("model", {title: car.name + " | GAPANAIJA", user: req.user, car, brands, models: mods, categories, cur, moment, settings})
 
              })  
            })
            
       })
        })
    }else {
        res.redirect("/")
    }
})
}

exports.get_makewithcat = (req, res, next) => {
        res.json({
    message: "Hello"
    })
}

exports.get_wishlist = (req, res, next) => {
       models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
            models.cat.findAll().then(categories => {
                models.setting.findAll().then(settings => {
              models.wish.findAll({where: {user_id: req.user.id}, include: [{association: "part", as: "part", include: ["car"]}]}).then(wishes => {
                  res.render("wishlist", {title: "WISHLIST | GAPANAIJA", user: req.user, wishes, brands, categories, cur, moment, settings})
              })
              })  
            })
            
       })
}
exports.remove_from_wish = (req, res, next) => {
    if(req.body.part_id && req.user){
                models.wish.destroy({where:{user_id: req.user.id, part_id: req.body.part_id}}).then(rows => {
                    res.json({
                        message: "Item Removed from wishlist"
                    })
                })
    }else if(!req.user && req.body.part_id) {
        res.json({
            error: "You have to be logged in to add products to your wishlist"
        })
    }else {
        res.json({
            error: "Please Provide Product ID"
        })
    }
}
exports.add_to_wish = (req, res, next) => {
    if(req.body.part_id && req.user){
        models.wish.findOne({where: {user_id: req.user.id, part_id: req.body.part_id}, include: ["part"]}).then(wish => {
            if(wish){
                res.json({
                    error: wish.part.name + " is already in your wishlist"
                })
            }else {
                models.wish.create({user_id: req.user.id, part_id: req.body.part_id}).then(wish => {
                    res.json({
                        message: "Success"
                    })
                })
            }
        })
    }else if(!req.user && req.body.part_id) {
        res.json({
            error: "You have to be logged in to add products to your wishlist"
        })
    }else {
        res.json({
            error: "Please Provide Product ID"
        })
    }
}

exports.get_category = (req, res, next) => {
    models.cat.findOne({where: {slug: req.params.slug}}).then(cat => {
        if(!cat){
            return res.redirect("/")
        }
         models.cat.findAll().then(categories => {
            models.setting.findAll().then(settings => {
    if(req.query.show){
        var limit = parseInt(req.query.show)
        if(typeof limit == "number"){
         models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
       models.part.findAll({where: {category: req.params.slug}, limit: limit, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(parts => {
            models.part.findAll({limit: 5, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(newProd => {
        res.render("parts_cat", {title: "PARTS | GAPANAIJA", user: req.user, parts, cur, moment, brands, newProd, categories, cat, settings})
            })
    })   
    })
        }else {
    models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
       models.part.findAll({where: {category: req.params.slug}, limit: 15, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(parts => {
            models.part.findAll({limit: 5, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(newProd => {
        res.render("parts_cat", {title: "PARTS | GAPANAIJA", user: req.user, parts, cur, moment, brands, newProd, categories, cat, settings})
            })
    })   
    })  
        }
    }else if(req.query.filter){
         models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
       models.part.findAll({where: {category: req.params.slug}, limit: 15, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(parts => {
            models.part.findAll({limit: 5, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(newProd => {
        res.render("parts_cat", {title: "PARTS | GAPANAIJA", user: req.user, parts, cur, moment, brands, newProd, categories, cat, settings})
            })
    })   
    })
    }else {
     models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
       models.part.findAll({where: {category: req.params.slug}, limit: 15, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(parts => {
            models.part.findAll({limit: 5, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(newProd => {
        res.render("parts_cat", {title: "PARTS | GAPANAIJA", user: req.user, parts, cur, moment, brands, newProd, categories, cat, settings})
            })
    })   
    })
    }
      
})
    })
    })
}
exports.get_model = (req, res, next) => {
    models.model.findOne({where: {slug: req.params.slug}, include: [{association: "car", as: "car", include: ['brand']}]}).then(model => {
         models.cat.findAll().then(categories => {
            models.setting.findAll().then(settings => {

     models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
       models.part.findAll({where: {model_id: model.id}, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(parts => {
            models.part.findAll({mimit: 5, order: [["createdAt", "DESC"]], include: ["reviews"]}).then(newProd => {
        res.render("mod_products", {title: "PARTS | GAPANAIJA", user: req.user, parts, cur, moment, brands, newProd, categories, model, settings})
            })
    })   
    })
    
      
})
    })
    })
}

exports.get_tc = (req, res, next) => {
          models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
          models.cat.findAll().then(categories => {
             models.setting.findAll().then(settings => {
                models.page.findOne({where: {name: "tc"}}).then(page => {
                    if(page){
                        res.render("tc", {title: "TERMS AND CONDITIONS | GAPANAIJA", user: req.user, cur, brands, categories, settings, page})
                    }else {
                        res.redirect("/")
                    }
                })
            
             })
})
         
    })
}


exports.get_privacy = (req, res, next) => {
          models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
          models.cat.findAll().then(categories => {
             models.setting.findAll().then(settings => {
                   models.page.findOne({where: {name: "privacy"}}).then(page => {
                    if(page){
                        
            res.render("privacy", {title: "PRIVACY POLICY | GAPANAIJA", user: req.user, cur, brands, categories, settings, page})
                    }else {
                        res.redirect("/")
                    }
                })
             })
})
         
    })
}


exports.get_about = (req, res, next) => {
          models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
          models.cat.findAll().then(categories => {
             models.setting.findAll().then(settings => {
                   models.page.findOne({where: {name: "about"}}).then(page => {
                    if(page){
                        
            res.render("aboutus", {title: "ABOUT US | GAPANAIJA", user: req.user, cur, brands, categories, settings, page})
                    }else {
                        res.redirect("/")
                    }
                })
             })
})
         
    })
}

exports.get_refer = (req, res, next) => {
          models.brand.findAll({include: [{association: "cars", as: "cars", include: ["models"]}]}).then(brands => {
          models.cat.findAll().then(categories => {
             models.setting.findAll().then(settings => {
            models.withdraw.findAll({where: {user_id: req.user.id}}).then(withdraws => {
                            res.render("refer", {title: "REFER AND EARN | GAPANAIJA", user: req.user, cur, brands, categories, settings, withdraws, moment})
            })

                   
             })
})
         
    })
}

exports.request_withdraw = (req, res, next) => {
    if(req.body.points && req.body.bank_name && req.body.acct && req.body.name && req.body.amount){
        models.setting.findAll().then(settings => {
            if(req.user.bal > parseInt(req.body.points) || req.user.bal == req.body.points){
                      if(req.body.bank_name == "044"){
              var bank_name = "Access Bank Plc"
          }if(req.body.bank_name == "063"){
              var bank_name = "Access Bank Plc (Diamond)"
          }
          if(req.body.bank_name == "050"){
              var bank_name = "EcoBank Nigeria"
          }if(req.body.bank_name == "084"){
              var bank_name = "Enterprise Bank Plc"
          }
          if(req.body.bank_name == "070"){
              var bank_name = "Fidelity Bank Plc"
          }if(req.body.bank_name == "011"){
              var bank_name = "First Bank of Nigeria Plc"
          }if(req.body.bank_name == "214"){
              var bank_name = "First City Monument Bank"
          }if(req.body.bank_name == "058"){
              var bank_name = "Guaranty Trust Bank Plc"
          }if(req.body.bank_name == "030"){
              var bank_name = "Heritage Bank"
          }if(req.body.bank_name == "082"){
              var bank_name = "Keystone Bank Ltd"
          }if(req.body.bank_name == "014"){
              var bank_name = "Mainstreet Bank Plc"
          }if(req.body.bank_name == "076"){
              var bank_name = "Skye Bank"
          }if(req.body.bank_name == "221"){
              var bank_name = "Stanbic IBTC Plc"
          }if(req.body.bank_name == "232"){
              var bank_name = "Sterling Bank Plc"
          }if(req.body.bank_name == "032"){
              var bank_name = "Union Bank Nigeria Plc"
          }if(req.body.bank_name == "033"){
              var bank_name = "United Bank for Africa Plc"
          }if(req.body.bank_name == "215"){
              var bank_name = "Unity Bank Plc"
          }if(req.body.bank_name == "035"){
              var bank_name = "WEMA Bank Plc"
          }if(req.body.bank_name == "057"){
           var bank_name = "Zenith Bank"   
          }
          
        models.withdraw.create({
            amount: parseInt(req.body.points) * settings[0].points,
            points: req.body.points,
            bank: bank_name,
            account_name: req.body.name,
            account_no: req.body.acct,
            user_id: req.user.id
        }).then(wit => {
            models.user.update({bal: req.user.bal - parseInt(req.body.points)}, {where: {id: req.user.id}})
            res.json({
                message: "Withdrawal request recieved and is being processed"
            })
        })  
            }else {
                res.json({
                    error: "Insufficient Points"
                })
            }
            
        })
    }else {
        res.json({
            error: "Please Provide Full Details"
        })
    }
    
    
}

exports.get_shipping = (req, res, next) => {
    if(req.body.lat && req.body.long){
        var lat_main = 9.0710391
        var long_main = 7.437945300000001
        models.amountperkm.findOne().then(amount => {
            var amt = parseInt(amount.price)
            var dist = geodist({lat: lat_main, lon: long_main}, {lat: req.body.lat, lon: req.body.long}, {exact: true, unit: 'km'})
            if(dist){
                res.json({
                    amountperkm: amt,
                    dist,
                    message: "Shipping Cost Calculated"
                })
            }else {
                res.json({
                    error: "There was an error with that request"
                })
            }
        })
    }else {
        res.json({
            error: "Please Provide a valid address"
        })
    }
}

exports.update_profile = (req, res, next) => {
    if(req.body.fname && req.body.lname && req.body.address){
        models.user.update({
            firstName: req.body.fname,
            lastName: req.body.lname,
            address: req.body.address
        }, {where: {
            id: req.user.id
        }}).then(rows => {
            res.json({
                message: "Profile Updated"
            })
        })
    }else {
        res.json({
            error: "Please Provide Firstname and LastName"
        })
    }
}

exports.reset_pass = (req, res, next) => {
     if(req.body.pass && req.body.pass2 && req.body.old){
        if(req.body.pass != req.body.pass2){
         res.json({
             error: "Password do not match"
         })   
        }
        else {
                   let errors = {}
                   if(!bcrypt.compareSync(req.body.old, req.user.password)){
                       return res.json({
                           errror: "Incorrect Current Password"
                       })
                   }
                        	return validateChange(errors, req).then(errors => {
                        		if(!isEmpty(errors)){
                        			res.json(errors)
                        		}
                        		
                        		
                        		else{
                        		    
                        		      models.user.update({password: bcrypt.hashSync(req.body.pass, bcrypt.genSaltSync(10))}, {where: {id: req.user.id}}).then(rows => {
                        		          res.json({
                        		              message: "Password Changed succesfully"
                        		          })
                        		      })
                        		    
                        		}
                        		
                        		
                        		})
        }
    }
    else {
      res.json({
          error: "incomplete data supplied"
      })  
    }
}

exports.join_mailing = (req, res, next) => {
if(req.body.email){
    models.mailing.findOne({where: {email: req.body.email}}).then(mail => {
        if(mail){
            res.json({
                message: "Subscribed to Mailing List"
            })
        }else {
           models.mailing.create({
               email: req.body.email
           }).then(maill => {
                          res.json({
                message: "Subscribed to Mailing List"
            }) 
           })
        }
    })
}
else {
    res.json({
        error: "No Email Provided"
    })
}
}

exports.update_dp = (req, res, next) => {
    if(req.user.img_url == "/img/profile.png"){
         var form = new formidable.IncomingForm(); 
    form.parse(req, function(err, fields, files){
        var __parentDir = "/home/gapaautoparts/public_html/app/public/"
        var oldPath = files.profile_pic.path; 
        var newPath = __parentDir + "uploads" + '/'+req.user.id + files.profile_pic.name 
        var rawData = fs.readFileSync(oldPath) 
      
        fs.writeFile(newPath, rawData, function(err){ 
            if(err) {res.json({error: "there was an error", err})}
            
               else{
                 
          models.user.update({img_url: "/uploads/" + req.user.id + files.profile_pic.name }, {where: {id: req.user.id}}).then(user => {
                res.json({message: "Profile Image Updated succesfully"}); 
        })  
               }
        }) 
  }) 
    }else {
        fs.unlink("./public" + req.user.img_url, function (err) {
    if (err) throw err;
    
             var form = new formidable.IncomingForm(); 
    form.parse(req, function(err, fields, files){
        var __parentDir = "/home/gapaautoparts/public_html/app/public/"
        var oldPath = files.profile_pic.path; 
        var newPath = __parentDir + "uploads" + '/'+req.user.id + files.profile_pic.name 
        var rawData = fs.readFileSync(oldPath) 
      
        fs.writeFile(newPath, rawData, function(err){ 
            if(err) {res.json({error: "there was an error", err})}
            
               else{
                 
          models.user.update({img_url: "/uploads/" + req.user.id + files.profile_pic.name }, {where: {id: req.user.id}}).then(user => {
                res.json({message: "Profile Image Updated succesfully"}); 
        })  
               }
        }) 
  })
});
    }
}


