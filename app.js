var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
let passport = require("passport")
var compression = require('compression')
let session = require("express-session")
var models = require("./models")
const nodemailer = require("nodemailer")
const rateLimit = require("express-rate-limit");

// Enable if you're behind a reverse proxy (Heroku, Bluemix, AWS ELB, Nginx, etc)
// see https://expressjs.com/en/guide/behind-proxies.html
// app.set('trust proxy', 1);

const limiter = rateLimit({
  windowMs: 2 * 60 * 1000, // 15 minutes
  max: 1000 // limit each IP to 100 requests per windowMs
});

var indexRouter = require('./routes/index');

require("./passport_setup")(passport)

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
app.use(compression({
    level: 7
}))
//  apply to all requests
app.use(limiter);
app.use(logger('combined'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.use(express.static(path.join(__dirname, 'public')));
app.disable('x-powered-by')

app.use(session({
	 name: 'SESS_ID',
    secret: '^#$5sX(Hf6KUo!#65^',
    resave: true,
	saveUninitialized: false,
    cookie: {
        maxAge: 10800000
    }
}));
app.use(passport.initialize());
app.use(passport.session())


app.post("/send-message", (req, res, next) => {
    const mails = (subject, page) => {
const transporter = nodemailer.createTransport({sendmail: true}, {
  from: "messages@GAPANAIJA.com",
  to: "contact@gapaautoparts.com",
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
if(req.body.email && req.body.name && req.body.message){
    mails("New Message From Gapaautoparts", `<h3>Name</h3><br /><p>${req.body.name}</p> <br /> <br /> <h3>Email Address</h3><br /><p>${req.body.email}</p> <br /> <br /><h3>Message</h3><br /><p>${req.body.message}</p>`)
    res.json({
        message: "sent"
    })
}else {
        res.json({
        error: "Please Provide your name, email address and message"
    })
}
})

app.use('/', (req, res, next) => {
    models.setting.findAll().then(sets => {
        if(sets.length > 0){
            if(sets[0].coming_soon == "true"){
                res.render('coming_soon', {title: "GAPAAUTOPARTS || COMING SOON", email: sets[0].email, img: sets[0].logo})
            }
            else {
                next()
            }
        }else {
            next()
        }
    })
}, indexRouter);


// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error',{title: `${err.status} || GAPANAIJA`, user: req.user});
});

// app.listen(2020, () => console.log("running"))
module.exports = app
