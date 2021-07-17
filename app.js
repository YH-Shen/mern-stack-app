const express = require("express");
const app = express();
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
app.use(cookieParser());
// body pareser in express
app.use(express.json());


// connect mongodb locally
// pass in the useNewUrlParser option to avoid future deprecation warning 
mongoose.connect("mongodb://localhost:27017/mernauth", {useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Successfully connected to database!");
});

const User = require("./models/User");

const userInput = {
    username: "testUser",
    password: "1234567",
    role: "admin"
}

const user = new User(userInput);
user.save((err, document) => {
    if (err){
        console.log(err);
    }
    console.log(document);
})

// listen port 5000 and avoid react app's 3000 port
app.listen(5000, ()=>{
    console.log("express server started")
})