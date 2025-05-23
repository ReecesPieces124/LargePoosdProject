// this segment needs to be added to index.js after server setup from cards lab

const express = require('express');
const dotenv = require('dotenv'); // allows us to use environment variables
const cors = require('cors'); // allows us to use cors
const connectDB = require('./config/db'); // import the connectDB function from the db.js file

dotenv.config(); // load our environment variables here
connectDB(); // call this function from /db.js to establish MongoDB connection (URI needed)

const Cats = require("./models/Cats");

(async () => {
  // Runs once at startup
  try {
    const indexes = await Cats.collection.indexes();
    const hasCatIdIdx = indexes.find(i => i.name === "catID_1");
    if (hasCatIdIdx) {
      await Cats.collection.dropIndex("catID_1");
      console.log("Dropped obsolete index catID_1");
    }
  } catch (err) {
    // ignore "index not found" errors
    if (err.codeName !== "IndexNotFound") console.error(err);
  }
})();

const app = express(); // create an instance of express

app.use(express.json()); // this tells Express we are using JSON in the req bodies
app.use(cors()); // this allows us to use cors in our app
app.use("/api/users", require("./routes/usersRoutes")); // this tells Express to use the usersRoutes file for all requests to /api/users (I can explain this part later)
app.use("/api/cats", require("./routes/catsRoutes")); // same as above but for catsRoutes file (I can explain this part later)
// health check for debug stuff w/ postman
app.get("/api/health", (req, res) => {
    res.status(200).json({ status: "OK", message: "Backend running." });
  });
  
const PORT = process.env.PORT || 5000; // this sets the port to the environment variable PORT or 5000 if not set (Express port listens to 5000 as explained in lecture)
app.listen(PORT, () => console.log(`Server running on port ${PORT}`)); // this starts the server and listens on the port we set above

// this segment needs to be added to index.js after server setup from cards lab


