const express = require('express');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const mongoose = require('mongoose');

// set up express js server
const app = express();

app.use(cors());
app.use(cookieParser());
app.use(express.json());

mongoose.connect('mongodb://localhost:27017/mernauth',{useNewUrlParser : true,useUnifiedTopology: true},()=>{
    console.log('successfully connected to database');
});

const userRouter = require('./routes/User');
app.use('/user',userRouter);

app.listen(5000,()=>{
    console.log('express server started');
});