// this goes inside of the config folder (/config/db.js) 
// shows what db we are going to be using here

const mongoose = require('mongoose'); // mongoose allows us to work with db, specifically MongoDB

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log(`MongoDB Connection Established: ${conn.connection.host}`); // this will show the host we are connected to
    }
    catch (error) {
        console.error(`Error with DB Connection: ${error.message}`); // if there is an error, show the error message
        process.exit(1); // exit the process with failure
    }
};

module.exports = connectDB; // export the connectDB function so we can use it in other files