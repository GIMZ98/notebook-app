const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    name:{
        type: String,
        required:true,
        unique: true,
    },
    password:{
        type: String,
        reqired: true,
    },
})

const Userdb = mongoose.model('userdb', schema);

module.exports = Userdb;