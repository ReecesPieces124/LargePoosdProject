// this is the actual definition of the API routes to take
// goes into (/routes/usersRoutes.js)
const express = require("express");
const router = express.Router();
const { getUsers, createUser, deleteUser } = require("../controllers/userController");

router.get("/", getUsers);         // GET /api/users
router.post("/", createUser);      // POST /api/users
router.delete("/:id", deleteUser); // DELETE /api/users/:id

module.exports = router;
