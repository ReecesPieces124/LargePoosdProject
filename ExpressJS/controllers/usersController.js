// goes into (/controllers/usersController.js)
// this is the controller (which handles logic) for routes adding/editing/deleting anything in Users schema

const Users = require("../models/Users");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// route for retrieving a user via MongoDB API
exports.getUsers = async (req, res) => {
  try {
    const users = await Users.find().select("-password"); //excluding password for security reasons
    res.json(users); // returns users info in JSON format
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// route for creating a new user
exports.createUser = async (req, res) => {
  try {
    const { firstname, lastname, password, email } = req.body; // definition of required body info

     // Ensure all required fields are provided
     if (!email || !firstname || !lastname || !password) {
      return res.status(400).json({ error: "All fields are required" });
    }
    
    // handling existing users
    const existingUser = await Users.findOne({email});
    if (existingUser){
      return res.status(400).json({error: "Email already registered"});
    }

    // password hashing
    const salt = await bcrypt.genSalt(10);
    const hashedPass = await bcrypt.hash(password, salt);

    // user creation
    const user = await Users.create({ firstname, lastname, password: hashedPass, email });

    // added success messages
    res.status(201).json({message: "User created successfully", user}); // code 201 means created successfully
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.loginUser = async (req, res) => {
  try {
    const {email, password} = req.body;
    const user = await Users.findOne({email});

    // finding user by email
    if (!user) {
      return res.status(400).json({error: "Invalid email or password"});
    }

    // comparing entered password w/ hashed password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch){ 
      return res.status(400).json({error: "Invalid email or password"});
    }

    // generates a jwt token 
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "1d",
    });

    // returns all the info based off a good login
    res.json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// route to get current user (based on token)
exports.getMe = async (req, res) => {
  try {
    const user = await Users.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ error: "User not found" });
    res.json(user);
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

