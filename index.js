const express = require('express');
const cookieParser = require('cookie-parser');
const sessions = require('express-session');
const path = require('path');


const app = express();
const PORT = 3000;

const oneDay = 1000 * 60 * 60 * 24;
app.use(sessions({
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

// page => index
app.get('/',(req,res) => {
    session = req.session;
    if(session.userid){
        res.send("welcome <a href= \'/logout'>click to logout</a>");
    }else
        res.sendFile('views/index.html',{root:__dirname})
});

app.post('/user',(req,res) => {
    if(req.body.username == myusername && req.body.password == mypassword){
        session=req.session;
        session.userid=req.body.username;
        console.log(req.session)
        res.sendFile('views/home.html',{root:__dirname})
    }
    else{
        res.send('wrong password')
    }
})
// page => logout
app.get('/logout',(req,res) => {
    req.session.destroy();
    res.redirect('/');
});

// page => Error
app.get('*', (req,res) => {
    res.send('ไม่พบหน้าที่คุณร้องขอ (Error: 404 Page not Found)')
});

app.listen(PORT, () => {
    console.log(`Server Running at port ${PORT}`)
});