// goes into (/controllers/catsController.js)
// this is the controller (which handles logic) for routes adding/editing/deleting anything in Cats schema

const Cats = require("../models/Cats");

// route for retrieving a cat via MongoDB API
exports.getCats = async (req, res) => {
  try {
    const cat = await Cats.find();
    res.json(cat); // returns cats info in JSON format
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// route for creating a new cat
exports.createCat = async (req, res) => {
  try { //added error handling
    const { name, gender, city, state, description, imageurl } = req.body; // definition of required body info
    const cat = await Cats.create({ name, gender, city, state, description, imageurl });
    res.status(201).json(cat); // code 201 means created successfully
  } catch (err) { //added error handling
    res.status(500).json({ error: err.message });
  }
};

// route for deleting a cat by ID
exports.deleteCat = async (req, res) => {
  const cat = await Cats.findById(req.params.id);
  if (cat) {
    await cat.deleteOne();
    res.json({ message: "Cat deleted" }); // deletion success
  } else {
    res.status(404).json({ message: "Cat not found" }); // deletion failure
  }
};
