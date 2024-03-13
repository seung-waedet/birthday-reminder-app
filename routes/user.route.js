const express = require('express');
const app = express.Router();

const userController = require('../controllers/user.controller');


// Route to create a new user
app.post('/users', userController.createUser);

// Route to get all users
app.get('/users', userController.getAllUsers);

// Route to get a user by ID
app.get('/users/:id', userController.getUserById);

// Route to update a user by ID
app.put('/users/:id', userController.updateUserById);

// Route to delete a user by ID
app.delete('/users/:id', userController.deleteUserById);

module.exports = app