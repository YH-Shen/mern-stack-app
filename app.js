const express = require("express");
const cookieParser = require("cookie-parser");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const app = express();



//middleware
app.use(express.json({ extended: false }));
//port
dotenv.config()

const PORT = process.env.PORT || 5000;



// connect mongodb locally
// pass in the useNewUrlParser option to avoid future deprecation warning 
mongoose.connect("mongodb://localhost:27017/mernauth", {useNewUrlParser: true, useUnifiedTopology: true }, () => {
    console.log("Successfully connected to database!");
});


// cors()
app.use(cors());


app.use(cookieParser());
// body pareser in express
app.use(express.json());

const userRouter = require("./routes/User");
app.use("/user", userRouter);


// listen port 5000 and avoid react app's 3000 port
// app.listen(5000, ()=>{
//     console.log("express server started")
// })

// error handler
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
  
    res.status(statusCode).json({
      type: 'error',
      message: err.errors,
    });
  });

app.listen(PORT, () => console.log(`express server started. server is listening on port ${PORT}`));