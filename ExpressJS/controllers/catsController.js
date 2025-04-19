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
    const { name, gender, city, state, description, imageurl } = req.body;
    const cat = await Cats.create({ name, gender, city, state, description, imageurl });
    res.status(201).json(cat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// third route is getCatByPfID which retrieves a cat by its pfID from the database
const getCatByPfID = async (req, res) => {
  try {
    const { pfID } = req.params;
    const cat = await Cats.findOne({ pfID: Number(pfID) }).lean();
    if (!cat) return res.status(404).json({ message: "Cat not found" });
    res.json(cat);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// fourth route is deleteCat which deletes a cat by its pfID from the database
const deleteCat = async (req, res) => {
  try {
    const cat = await Cats.findById(req.params.id);
    if (cat) {
      await cat.deleteOne();
      res.json({ message: "Cat deleted" });
    } else {
      res.status(404).json({ message: "Cat not found" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// all functions to be exported and used in other files
module.exports = {
  getCats,
  createCat,
  getCatByPfID,
  deleteCat
};
