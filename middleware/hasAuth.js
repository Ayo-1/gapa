let createError = require('http-errors')
var models = require("../models")
exports.isLoggedIn = function(req, res, next) {
	if(req.user){
		next();
	    
	}
	
	else if(!req.user || !req.user.id){
	    res.redirect('/login?ref=' + req.url)
	}
	else {
	    res.redirect('/login?ref=' + req.url)
	}
}

exports.isLoggedInUsr = function(req, res, next) {
	if(req.user && req.user.role === "user"){
		next();
	    
	}
	
	else if(!req.user || !req.user.id){
	    res.redirect('/')
	}
	else {
	    res.redirect('/')
	}
}

exports.isLoggedInInv = function(req, res, next) {
	if(req.user && req.user.role === "investor"){
		next();
	    
	}
	
	else if(!req.user || !req.user.id){
	    res.redirect('/')
	}
	else {
	    res.redirect('/')
	}
}

exports.isLoggedInReq = function(req, res, next){
    if(req.user){
        next();
    }
    else{
        res.status(401).json({error: "you are not authorized to make this request, please login"})
    }
}


exports.isLoggedInReqUsr = function(req, res, next){
    if(req.user && req.user.role === "user"){
        next();
    }
    else{
        res.status(401).json({error: "you are not authorized to make this request, please login"})
    }
}



exports.isLoggedInReqInv = function(req, res, next){
    if(req.user && req.user.role === "investor"){
        next();
    }
    else{
        res.status(401).json({error: "you are not authorized to make this request, please login"})
    }
}

exports.isAdmin = (req, res, next) => {
	if(req.user){
		if(req.user.isAdmin && req.user.role == "admin"){
			next();
		}
		else{
		    if(req.user.role == "client"){
			res.redirect("/client")
		    }else if(req.user.role == "lawyer"){
		      res.redirect("/dashboard")
		    }
		}
	}
	else if(!req.user || !req.user.id){
		res.redirect('/login')
	}
}

exports.noAuth = (req, res, next) => {
	 if(!req.user || !req.user.id){
		next();
	}
	else{
			res.redirect("/")
		}
	}

exports.isVerified = (req, res, next) => {
    if(req.user.emailVerified){
        next()
    }
    else{
        res.redirect('/verify-email')
    }
}


exports.isVerifiedReq = (req, res, next) => {
    if(req.user.emailVerified){
        next()
    }
    else{
        res.status(401).json({error: "you are not authorized to make this request, please verify your account"})
        }
}


exports.logout = (req, res, next) => {
    if(req.user){
        next()
    }
    else{
        res.redirect("/login")
    }
}

exports.isClient = (req, res, next) => {
    if(req.user.role == "client"){
        next()
    }
    else{
        if(req.user.role == "admin"){
          res.redirect("/admin")  
        }
        else if(req.user.role == "lawyer"){
        res.redirect("/dashboard")
        }
    }
}


exports.isLawyer = (req, res, next) => {
    if(req.user.role == "lawyer"){
        next()
    }
    else{
         if(req.user.role == "admin"){
          res.redirect("/admin")  
        }
        else if(req.user.role == "client"){
        res.redirect("/client")
        }
    }
}

exports.profile_added = function(req, res, next){
     models.profile_user.findOne({where: {userid: req.user.id}}).then(prf_user => {
        if(!prf_user){
            models.profile_investor.findOne({where: {investor_id: req.user.id}}).then(prf_inv => {
                if(!prf_inv){
                    next()
                }
                if(prf_inv){
                    res.redirect("/dashboard")
                }
            })
        }
        if(prf_user){
            res.redirect("/dashboard")
        }
    })
}

exports.has_profile = function(req, res, next){
    models.profile_user.findOne({where: {userid: req.user.id}}).then(prf_user => {
        if(!prf_user){
            models.profile_investor.findOne({where: {investor_id: req.user.id}}).then(prf_inv => {
                if(!prf_inv){
                    res.redirect("/add-details")
                }
                if(prf_inv){
                    next()
                }
            })
        }
        if(prf_user){
            next()
        }
    })
}

exports.already_verified = function(req, res, next){
    if(req.user.emailVerified){
        res.redirect("/")
    }
    else{
        next()
    }
}