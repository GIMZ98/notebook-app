require('dotenv').config()
const mongoose = require('mongoose');

exports.handler = async()=>{
    try{
        const con = await mongoose.connect(process.env.MONGO_URL)

        console.log(`MongoDB connected: ${con.connection.host}`);
    }
    catch(err){
        console.log("connection error");
        process.exit(1);
    }
}