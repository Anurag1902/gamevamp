require('dotenv').config();
import DBConnection from "./configs/DBConnection";
import express from "express";
import configViewEngine from "./configs/viewEngine";
import initWebRoutes from "./routes/web";
import bodyParser from "body-parser";
import cookieParser from 'cookie-parser';
import session from "express-session";
import connectFlash from "connect-flash";
import passport from "passport";
const moment = require("moment");
const nodemailer = require("nodemailer");

let app = express();

// var usersRouter = require('./routes/users');
// app.use('/users', usersRouter);
//use cookie parser
app.use(cookieParser('secret'));

//config session
app.use(session({
    secret: 'secret',
    resave: true,
    saveUninitialized: false,
    cookie: {
        maxAge: 1000 * 60 * 60 * 24 // 86400000 1 day
    }
}));

app.use((req, res, next)=>{
    res.locals.moment = moment;
    next();
  });
// Enable body parser post data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

//Config view engine
configViewEngine(app);

//Enable flash message
app.use(connectFlash());

//Config passport middleware
app.use(passport.initialize());
app.use(passport.session());

// init all web routes
initWebRoutes(app);


var teamsRouter = require('./routes/teams');
app.use('/teams', teamsRouter);
 
var reportRouter = require('./routes/reports');
app.use('/reports', reportRouter);
 
var usersRouter = require('./routes/users');
app.use('/users', usersRouter);
 
var matchRouter = require('./routes/user_match');
app.use('/user_match', matchRouter);

app.use(express.json());
 
app.post('/report', (req, res) => {
   
    // console.log(req.body);
 
    const transporter = nodemailer.createTransport({
        service: 'gmail',
        auth: {
            user: 'gamevamp22@gmail.com',
            pass: 'GameVamp!@#'
        }
    })
 
    const mailOptions = {
        from: req.body.email,
        to: 'aasingh2vin@gmail.com',
        subject: `Message from ${req.body.email} : ${req.body.subject}`,
        text: req.body.message
    }
 
    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.log(error);
            res.send('error');
        }
        else {
            let userItem = {
                username: req.body.name,
                email: req.body.email,
                subject: req.body.subject,
                message: req.body.message
            };
            console.log("useritem");
            console.log(userItem);
            DBConnection.query(
                'INSERT INTO user_report set ? ', userItem,
                function (err, rows) {
                    if (err) {
                        console.log("error")
                    }
                    // console.log(rows);
                }
            );
            console.log('Email sent: ' + info.respnse);
            res.send('success');
        }
    })
 
});


let port = process.env.PORT || 8080;
app.listen(port, () => console.log(`Esports Website is running on port ${port}!`));
module.exports = app;
