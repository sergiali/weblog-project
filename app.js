const path = require('path');

const express = require('express');
const dotEnv = require('dotenv');
const morgan = require('morgan');
const expresslayouts = require('express-ejs-layouts');

const blogRoutes = require('./routes/blog');
const connectDb = require('./config/db');
const dashRoutes = require('./routes/dashboard');

//* Load Config 
dotEnv.config({path:"./config/config.env"});

const app = express();

//* Logging 
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
};

//? View Engine (Ejs)
app.use(expresslayouts);
app.set("view engine","ejs");
app.set("layout","./layouts/mainLayout");
app.set("views","views");

//* Database Connection
connectDb();

//! Statics Folder
app.use(express.static(path.join(__dirname,"./public")));

//* Routes
app.use("/dashboard",dashRoutes);
app.use(blogRoutes);

const PORT = process.env.PORT || 3000 ;
app.listen(PORT,() => console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));