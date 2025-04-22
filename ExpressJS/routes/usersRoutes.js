// this is the actual definition of the API routes to take
// goes into (/routes/usersRoutes.js)
const express = require("express");
const router = express.Router();
const { getUsers, createUser, deleteUser, loginUser, getMe } = require("../controllers/usersController");
const auth = require("../middleware/auth"); 

router.get("/", getUsers);         // GET /api/users
router.post("/register", createUser);      // POST /api/users
router.delete("/:id", deleteUser); // DELETE /api/users/:id
router.get("/me", auth, getMe);  
router.post("/login", loginUser);


// // get info abt currently auth'd user
// router.get("/me", auth, async (req, res) => {
//     try {
//       // use  ID from  decoded token to find user 
//       const user = await Users.findById(req.user.id).select("-password"); // exclude password
//       if (!user) 
//         return res.status(404).json({ error: "User not found" });
//       res.json(user); // return user info
//     } catch (err) {
//       res.status(500).json({ error: err.message });
//     }
//   });

module.exports = router;
