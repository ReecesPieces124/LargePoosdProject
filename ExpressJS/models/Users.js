// goes into (/models/Users.js)
// this is the model for the user schema defined in brit's monogoDB page

const mongoose = require('mongoose'); // explained in index.js

const usersSchema = new mongoose.Schema({ 
    firstname: String,
    lastname: String,
    email: { type: String, unique: true }, // this is the email and is unique to each user
    password: String,
});

module.exports = mongoose.model("Users", usersSchema);