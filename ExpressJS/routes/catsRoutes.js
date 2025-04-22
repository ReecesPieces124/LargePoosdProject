// This file contains helper functions to fetch cat data from the API. will be morphed into the other one

const express = require("express");
const router = express.Router();
const {
  getCats,
  getCatByID,
  deleteCat,
  createCat // included for optional use (admin/manual testing)
} = require("../controllers/catsController");

router.get("/", getCats);               // GET all cats
router.get("/pfid/:pfID", getCatByID); // GET cat by pfID
router.post("/", createCat);            // POST new cat (fallback / test route)
router.delete("/:id", deleteCat);       // DELETE by _id

module.exports = router;
