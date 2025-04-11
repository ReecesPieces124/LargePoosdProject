// goes into (/controllers/usersController.js)
// this is the controller (which handles logic) for routes adding/editing/deleting anything in Users schema

const Users = require("../models/Users");

// route for retrieving a user via MongoDB API
exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find();
    res.json(users); // returns users info in JSON format
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// route for creating a new user
exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, password, email } = req.body; // definition of required body info
    const user = await Users.create({ firstname, lastname, password, email });
    res.status(201).json(user); // code 201 means created successfully
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// route for deleting a user by ID
exports.deleteUser = async (req, res) => {
  const user = await Users.findById(req.params.id);
  if (user) {
    await user.deleteOne();
    res.json({ message: "User deleted" }); // deletion success
  } else {
    res.status(404).json({ message: "User not found" }); // deletion failure
  }
};
