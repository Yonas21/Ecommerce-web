const express = require('express');
let userRoutes = express.Router();

let userController = require('../controllers/user');

//define the store route
userRoutes.post('/signup', userController.register);

//log into our account
userRoutes.post('/login', userController.authenticate);

//delete the user route handler
userRoutes.delete('/:userId', userController.logout);

module.exports = userRoutes;
