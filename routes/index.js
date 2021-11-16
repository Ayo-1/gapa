

var express = require('express');
var router = express.Router();
var bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken')
const passport = require("passport")
const myPassport = require('../passport_setup')(passport)
var models = require("../models")
const {validateUser} = require("../validators/signup");
const {validateLogin} = require("../validators/login");
const {validateChange} = require("../validators/change");
var Sequelize = require("sequelize")

var {isLoggedInReq, isLoggedIn, noAuth, isVerified, already_verified} = require("../middleware/hasAuth")

var userCont = require("../controllers/userCont")
// users routes 


/* GET home page. */
router.get('/', userCont.show_index);

router.get('/privacy-policy', userCont.get_privacy);

router.get('/terms', userCont.get_tc);

router.get('/about-us', userCont.get_about);

router.get('/login', noAuth, userCont.show_login);

router.get('/register', noAuth, userCont.show_register);

router.get('/forgot-password', noAuth, userCont.get_forgot);

router.get('/verify-email', isLoggedIn, already_verified, userCont.show_verify);

router.get('/parts', userCont.get_parts);

router.get('/parts/:id', userCont.get_product);

router.get('/cart', userCont.get_cart);

router.get('/search', userCont.search);

router.get('/make-search', userCont.search_2);

router.get('/parts-search', userCont.search_4);

router.get('/vin-search', userCont.search_3);

router.get("/makes/:slug", userCont.get_make)

router.get("/makes/:slug/:cat", userCont.get_makewithcat)

router.get("/category/:slug", userCont.get_category)

router.get("/cars/:id", userCont.get_models)

router.get("/model/:slug", userCont.get_model)

router.get('/checkout',  isLoggedIn, isVerified, userCont.get_checkout);

router.get('/refer',  isLoggedIn, isVerified, userCont.get_refer);

router.get('/account',  isLoggedIn, isVerified, userCont.get_account);

router.get('/wishlist',  isLoggedIn, isVerified, userCont.get_wishlist);

router.get("/orders", isLoggedIn, isVerified, userCont.get_orders)

router.get("/orders/:id", isLoggedIn, isVerified, userCont.get_order)



//login 
router.post("/login", userCont.login)

router.post("/register", userCont.register)

router.post("/verify", isLoggedInReq, userCont.verify)

router.post("/send-review", isLoggedInReq, userCont.send_review)

router.post("/add-to-wishlist", isLoggedInReq, userCont.add_to_wish)

router.post("/remove-from-wishlist", isLoggedInReq, userCont.remove_from_wish)

router.post('/items', userCont.get_items);

router.post("/order", userCont.order)

router.post("/get-shipping", userCont.get_shipping)

router.post("/request-withdrawal", isLoggedInReq, userCont.request_withdraw)

router.post("/update-profile", isLoggedInReq, userCont.update_profile)

router.post("/change-pass", isLoggedInReq, userCont.reset_pass)

router.post("/update-dp", isLoggedInReq, userCont.update_dp)

router.post("/join-mailing", userCont.join_mailing)

router.post("/forgot", userCont.forgot)

router.post("/reset-password", userCont.reset_pass2)

router.get("/logout", (req, res, next) => {
    	req.logout();
	req.session.destroy()
	res.redirect('/')
})



module.exports = router;
