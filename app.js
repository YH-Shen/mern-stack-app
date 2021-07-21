const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// set up express js server
const app = express();

// cors to avoid cors issues
// enable server to respond preflight requests(Option => ask about origin and request options with headers) 
app.use(cors());
// Middleware - parse the cookies and populates req.cookies
app.use(cookieParser());
//  handle requests as JSON objs
app.use(express.json());

// connect server with mongodb
// pass in the useNewUrlParser option to avoid future deprecation warning  
mongoose.connect('mongodb://localhost:27017/mernauth',{useNewUrlParser : true,useUnifiedTopology: true},()=>{
    console.log('successfully connected to database');
});


const userRouter = require('./routes/User');
app.use('/user',userRouter);

//  better practice would be using dotenv to setup local env files
app.listen(5000,()=>{
    console.log('express server started');
});