// goes into (/models/Cats.js)
// this is the model for the user schema defined in brit's monogoDB page

const mongoose = require('mongoose'); // explained in index.js

// doesn't have to match what's online on atlas
const catsSchema = new mongoose.Schema({ 
    pfURL: String, // petfinder URL
    name: String,
    age: String,
    gender: String,
    status: String,
    city: String,
    state: String,
    breed: String,
    description: String,
    imageURL: String,
    
    // in order to determine whether or not the cat was created via petfinder or manually by a user
    source: {
        type: String,
        enum: ["manual","petfinder"],
        default: "manual"
    },

    // if user created, will help determine if 
    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        default: null
    }

});

module.exports = mongoose.model("Cats", catsSchema);
