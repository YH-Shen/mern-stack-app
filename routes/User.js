const express = require('express');
const userRouter = express.Router();
// authentication middleware for node.js
const passport = require('passport');
const passportConfig = require('../passport');
const JWT = require('jsonwebtoken');
//  import schemas
const User = require('../models/User');
const Todo = require('../models/Todo');

// sign the token, better practice would be hide the secret or key
// issuer, subject/primary key, toekn expiration time
const signToken = userID =>{
    return JWT.sign({
        iss : "SYHSYH",
        sub : userID
    },"SYHSYH",{expiresIn : "10d"});
}

//  define register and signin end points
//  HTTP status code:
//  1XX Informational responses
//  2XX Successful responses 
//  3XX Redirects or further progress
//  4XX Client errors
//  5XX Server errors
userRouter.post('/register', (req, res)=>{
    const { username, password, role } = req.body;
    User.findOne({username}, (err,user)=>{
        if (err){
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        }
        if (user) {
            res.status(400).json({message : {msgBody : "Username is already taken", msgError: true}});
        }
        else {
            const newUser = new User({username, password, role});
            newUser.save(err => {
                if (err) {
                    res.status(500).json({message : {msgBody : "Error has occured during saving", msgError: true}});
                }
                else{
                    res.status(201).json({message : {msgBody : "Account successfully created", msgError: false}});
                }
            });
        }
    });
});

//  Authenticate with local strategy
userRouter.post('/login', passport.authenticate('local', {session : false}), (req,res) => {
    if(req.isAuthenticated()){
       const {_id,username,role} = req.user;
       const token = signToken(_id);

       // httpOnly: on the client side cannot touch the token with JS to prevent cross-site scripting attacks
       // sameSite: to protect against cross-site request forgery attacks
       res.cookie('access_token', token, {httpOnly: true, sameSite:true}); 
       res.status(200).json({isAuthenticated : true,user : {username, role}});
    }
});

userRouter.get('/logout',passport.authenticate('jwt',{session : false}),(req,res)=>{
    // remove the JWT token so that they have to signin again to access their todos/admin panel
    res.clearCookie('access_token');
    res.json({user:{username : "", role : ""},success : true});
});

userRouter.post('/todo', passport.authenticate('jwt',{session : false}), (req, res)=>{
    const todo = new Todo(req.body);
    todo.save ( err => {
        if(err){
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        }
        else{
            req.user.todos.push(todo);
            req.user.save( err => {
                if(err){
                    res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
                }
                else {
                    res.status(200).json({message : {msgBody : "Successfully created todo", msgError : false}});
                }
            });
        }
    })
});

userRouter.get('/todos', passport.authenticate('jwt', {session : false}), (req,res) => {
    User.findById({_id : req.user._id}).populate('todos').exec((err,document)=>{
        if(err)
            res.status(500).json({message : {msgBody : "Error has occured", msgError: true}});
        else{
            res.status(200).json({todos : document.todos, authenticated : true});
        }
    });
});

userRouter.get('/admin', passport.authenticate('jwt', {session : false}), (req, res)=>{
    if(req.user.role === 'admin'){
        res.status(200).json({message : {msgBody : 'You are an admin', msgError : false}});
    }
    else
        res.status(403).json({message : {msgBody : "You're not an admin,go away", msgError : true}});
});

userRouter.get('/authenticated', passport.authenticate('jwt', {session : false}), (req, res)=>{
    const {username, role} = req.user;
    res.status(200).json({isAuthenticated : true, user : {username, role}});
});





module.exports = userRouter;