// goes into (/models/Cats.js)
// this is the model for the user schema defined in brit's monogoDB page

const mongoose = require('mongoose'); // explained in index.js

const catsSchema = new mongoose.Schema({ 
    name: String,
    age: Number,
    gender: String,
    city: String,
    state: String,
    description: String,
    imageurl: String,
    catID: { type: Number, unique: true }, // this is the catID that is unique to each user and will serve as primary key when referenced.
});

module.exports = mongoose.model("Cats", catsSchema);