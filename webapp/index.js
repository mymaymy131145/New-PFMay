const express = require('express');
const cookieParser = require('express-session');
const session = require('express-session');

const app = express();
const PORT = 3000;

const oneDay = 1000 * 60 * 60 * 24;
app.use(session({
    secret: "thisismysecrctekey",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(express.static(__dirname));

app.use(cookieParser());

const myusername = 'admin'
const mypassword = '12345'

var session;