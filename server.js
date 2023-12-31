const App=require("./App");

const Mongoose=require("mongoose");
const dotenv=require('dotenv');
const path=require('path');
dotenv.config({path:path.join(__dirname,"cofig.env")});
Mongoose.connect(process.env.CONN_STRING,{family:4}).then(_=>console.log("DB Connected")).catch(err=>{console.log("Mongoose Error :",err)});

