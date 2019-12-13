//Creating schema. Schema includes Name, Password and Email
const mongoose = require("mongoose"),
Schema = mongoose.Schema;

const UserSchema = new Schema({
    Name: String,
    Password: String,
    Email: String,
    Sex: String,
    Info: String
}, { timestamps: true });

//Exporting our schema and making an variable that includes everything inside schema
const dataLogger = mongoose.model("User Collections", UserSchema);
module.exports = dataLogger;
