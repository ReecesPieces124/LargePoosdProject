// this is the actual definition of the API routes to take
// goes into (/routes/catsRoutes.js)
const express = require("express");
const router = express.Router();
const { getCats, createCat, deleteCat } = require("../controllers/catsController");

router.get("/", getCats);         // GET /api/cats
router.post("/", createCat);      // POST /api/cats
router.delete("/:id", deleteCat); // DELETE /api/cats/:id

module.exports = router;
