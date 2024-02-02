const express = require("express");
const path = require("path");
const router = express.Router();
const userController = require(path.join(__dirname, "controllers/user_crud"));

// Get all users
router.get("/get-all-users", userController.getAllUsers);

// Get user by ID
router.get("/get-user-by-id/:id", userController.getUserById);

// Create a new user
router.post("/create-user", userController.createUser);

// Update a user by ID
router.put("/update-user-by-id/:id", userController.updateUser);

// Delete a user by ID
router.delete("/delete-user-by-id/:id", userController.deleteUser);

module.exports = router;
