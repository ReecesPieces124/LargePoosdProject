const Cats = require("../models/Cats"); // import Cats schema

// first route is getCats which retrieves all cats from the database
const getCats = async (req, res) => {
  try {
    const cats = await Cats.find().lean();
    res.json(cats);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// second route is createCat which creates a new cat in the database (generally not used unless we want offline cats)
const createCat = async (req, res) => {
  try {
    // required info
    const { name, gender, city, state, description, imageurl } = req.body;
    // creates cat in DB
    const cat = await Cats.create({ name, gender, city, state, description, imageurl, source: "manual", createdBy: req.user.id });
    // returns success
    res.status(201).json(cat);
    // error handle
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// third route is getCatByPfID which retrieves a cat by its mongo ID from the database
const getCatByID = async (req, res) => {
  try {
    // retrieve the cat via the _id from mongo
    const {id} = req.params;
    const cat = await Cats.findById(id).lean();
    // if not cat, return 404
    if (!cat) return res.status(404).json({ message: "Cat not found" });
    // response is the json of the cat's info
    res.json(cat);
    // error handle
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// fourth route is deleteCat which deletes a cat by its mongo ID from the database
const deleteCat = async (req, res) => {
  try {
    // find the cat via requested id
    const cat = await Cats.findById(req.params.id);

    // if not found, return 404 status
    if (!cat) {
      return res.status(404).json({ message: "Cat not found" });
  }
    // verify that the user can delete this cat 
    if (cat.source !== "manual" || !cat.createdBy.equals(req.user.id)) {
        return res.status(403).json({message: "Not allowed to delete this cat listing (User authentication Error)."});
    }
    // delete the cat and send success message
    await cat.deleteOne();
    res.json({ message: "Cat deleted" });
    // try-catch error handle 
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// all functions to be exported and used in other files
module.exports = {
  getCats,
  createCat,
  getCatByID,
  deleteCat
};
