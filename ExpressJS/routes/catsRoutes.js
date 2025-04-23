// This file contains helper functions to fetch cat data from the API. will be morphed into the other one

const express = require("express");
const router = express.Router();
const { searchCats } = require("../controllers/searchCats");
const auth = require("../middleware/auth"); // middleware for authentication

const {
  getCats,
  getCatByID,
  deleteCat,
  createCat // included for optional use (admin/manual testing)
} = require("../controllers/catsController");

router.get("/", getCats);               // GET all cats
router.get("/:id", getCatByID); // GET cat by pfID
router.post("/", auth, createCat);            // POST new cat (fallback / test route)
router.delete("/:id", auth, deleteCat);       // DELETE by _id
router.post("/search-cats", searchCats); // POST search for cats by name

module.exports = router;
