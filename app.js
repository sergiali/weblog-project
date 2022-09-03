const path = require('path');

const express = require('express');
const dotEnv = require('dotenv');
const morgan = require('morgan');
const expresslayouts = require('express-ejs-layouts');


const connectDb = require('./config/db');


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

//! BodyParser
app.use(express.urlencoded({extended: false}));


//* Database Connection
connectDb();

//! Statics Folder
app.use(express.static(path.join(__dirname,"./public")));

//* Routes
app.use("/",require('./routes/blog'));
app.use("/users",require('./routes/users'));
app.use("/dashboard",require('./routes/dashboard'));

const PORT = process.env.PORT || 3000 ;
app.listen(PORT,() => console.log(`server is running in ${process.env.NODE_ENV} mode on port ${PORT}`));