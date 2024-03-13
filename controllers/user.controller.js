const express = require('express');
const User = require('../models/user.model');
const path = require('path');
const router = express.Router();
const app = express();

// router.get('/thankyou', (req, res) => {
//     res.sendFile(__dirname + '/thanks.html');
//   });
app.use(express.static('public'))


  // Create a new user
async function createUser(req, res) {
  try {
    const newUser = new User(req.body);
    const savedUser = await newUser.save();
    res.sendFile(__dirname + '/thankyou.html');
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Read all users
async function getAllUsers(req, res) {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Read user by ID
async function getUserById(req, res) {
  try {
    const user = await User.findById(req.params.id);
    if (user) {
      res.json(user);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Update user by ID
async function updateUserById(req, res) {
  try {
    const updatedUser = await User.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (updatedUser) {
      res.json(updatedUser);
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Delete user by ID
async function deleteUserById(req, res) {
  try {
    const deletedUser = await User.findByIdAndDelete(req.params.id);
    if (deletedUser) {
      res.json({ message: 'User deleted successfully' });
    } else {
      res.status(404).json({ message: 'User not found' });
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

// Route to display thank you page


module.exports = {
  createUser,
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById
};
