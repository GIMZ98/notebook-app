const mongoose = require("mongoose");

var schema = new mongoose.Schema({
    userId:{
        type: String,
        required:true,
    },
    title:{
        type: String,
        required:true,
    },
    content:{
        type: String,
    },
})

const Notedb = mongoose.model('notedb', schema);

module.exports = Notedb;