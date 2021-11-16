let LocalStrategy = require('passport-local').Strategy;
let bcrypt = require('bcrypt');
let models = require("./models")
var Sequelize = require("sequelize")
var Op = Sequelize.Op
const validPassword = (user, password) => {
	return bcrypt.compareSync(password, user.password)
}
module.exports = (passport) => {

	passport.serializeUser((user, done) => {
		done(null, user.id)
	})
	passport.deserializeUser((id, done) => {
		models.user.findOne({
			where: {
				"id": id
			}
		}).then((user) => {
			if(!user){
			        done(new Error("Wrong user id."))
			
			}
			else{
			console.log(user);
				done(null, user);
			}
					})
			.catch(err => {
				if(err) {
					console.log(err);
				}
			})
	});
	passport.use(new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	(req, email, password, done) => {
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
                                     console.log(phn, "ayom")
                                }else {
                                    var phn = req.body.email
                                }
		return models.user.findOne({
			where: {
				[Op.or]: [{email: req.body.email}, {phone: phn}]
			}
		}).then(user => {
			if(!user) {
				console.log("incorrect credentials");
				req.flash({"message": "User is not registered"})
				return done(null, false)
			}
			else if(!user.password){
				console.log("password error");
				req.flash({"message": "Incorrect login details"})
				return done(null, false)
			}
			else if(!validPassword(user, password)){
				console.log("incorrect password");
				req.flash({"message": "Incorrect login details"})
				return done(null, false)
			}

			return done(null, user)

		})
		.catch(err => {
			console.log(err.message)
		
		})
	}))
	
		passport.use("investor", new LocalStrategy({
		usernameField: 'email',
		passwordField: 'password',
		passReqToCallback: true
	},
	(req, email, password, done) => {
		return models.investor.findOne({
			where: {
				'email': email
			}
		}).then(user => {
			if(!user) {
				console.log("incorrect credentials");
				req.flash({"message": "User is not registered"})
				return done(null, false)
			}
			else if(!user.password){
				console.log("password error");
				req.flash({"message": "Incorrect login details"})
				return done(null, false)
			}
			else if(!validPassword(user, password)){
				console.log("incorrect password");
				req.flash({"message": "Incorrect login details"})
				return done(null, false)
			}

			return done(null, user)

		})
		.catch(err => {
			console.log(err.message)
		
		})
	}))
}