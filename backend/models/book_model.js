const bcrypt = require("bcrypt");
const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookschema = new Schema({
    "ISBN" : {
        type : Number,
        required : true
    },
    "title" : {
        type : String,
        required : true,
    },
    "subtitle" : {
        type : String ,
        required : true,
    },
    "author"  :{
        type : String , 
        required : true
    },
    "published" :{
        type : Date , 
        required :  new Date().getTime()
    },
    "publisher" :{
        type : String ,
        required : true
    },
    "pages": {
      type: Number,
      required: true,
      min: [50, "Pages must be at least 50."],
    },
    "description" :{
        type : String ,
        required : true
    },
    "status" : {
        type : String,
        enum: ["Available", "Borrowed" , "Lost"],
        default : "Available"
    },
    "borrower" :{
        type : String,
        default : "admintype"
    }
})

module.exports = mongoose.model("Book" , bookschema);