const path = require('path');

const express = require('express');
const dotEnv = require('dotenv');

const indexRoutes = require('./routes/index');

//* Load Config 
dotEnv.config({path:"./config/config.env"});

const app = express();

//? View Engine (Ejs)
app.set("view engine","ejs");
app.set("views","views");


//! Statics Folder
app.use(express.static(path.join(__dirname,"./public")));

//* Routes
app.use(indexRoutes);

const PORT = process.env.PORT || 3000 ;
app.listen(PORT,() => console.log(`server is running in ${process.env.NODE-ENV} mode on port ${PORT}`));