const cryptoRandomString = require('crypto-random-string');
var bcrypt = require("bcrypt")
var jwt = require('jsonwebtoken')
const passport = require("passport")
const myPassport = require('./passport_setup')(passport)
var models = require("./models")
var Sequelize = require("sequelize")
const {isEmpty} = require('lodash')
const nodemailer = require("nodemailer")
const {validateUser, validateInvestor} = require("./validators/signup");
const {validateLogin, validateLoginInvestor} = require("./validators/login")
const {validateChange} = require("./validators/change")
const multer = require('multer');
const path = require('path');
const fs = require('fs'); 
const formidable = require('formidable');
var moment = require("moment")
const cron =  require("node-cron")
const geolib = require('geolib');
const axios = require("axios")

const Op = Sequelize.Op;

models.model.findAll({where: { [Op.or]: [{ [Op.or]: [{ year: 1980}, {year_2: 1980} ]},{ [Op.and]: [{year: {[Op.lt]: 1980}},{ year_2: {[Op.gt]: 1980}}]}] } }).then(models => {
    console.log(models)
})