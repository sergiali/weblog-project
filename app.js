const path = require('path');

const express = require('express');
const dotEnv = require('dotenv');
const morgan = require('morgan');

const indexRoutes = require('./routes/index');
const connectDb = require('./config/db');

//* Load Config 
dotEnv.config({path:"./config/config.env"});

const app = express();

//* Logging 
if(process.env.NODE_ENV === "development"){
    app.use(morgan("dev"));
};

//? View Engine (Ejs)
app.set("view engine","ejs");
app.set("views","views");

//* Database Connection
connectDb();

//! Statics Folder
app.use(express.static(path.join(__dirname,"./public")));

//* Routes
app.use(indexRoutes);

const PORT = process.env.PORT || 3000 ;
app.listen(PORT,() => console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));