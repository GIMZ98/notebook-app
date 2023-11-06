require('dotenv').config()
const mongoose = require('mongoose');

let con = null

const connect = async()=>{
    try{
        con = await mongoose.connect(process.env.MONGO_URL)

        console.log(`MongoDB connected: ${con.connection.host}`);
    }
    catch(err){
        console.log("connection error");
        process.exit(1);
    }
}

const close = async()=>{
    if(con && con.connection.readyState === 1){
        await con.disconnect();
        con = null;
    }
}

module.exports = {
    connect,
    close,
};