const userService = require("../../../src/user/services/user_service");
const responseWrapper = require("../../../core/helpers/responseWrapper");
const { ValidationError } = require('class-validator');

const getAllUsers = async (req, res) => {
  try {
    const users = await userService.get_users_service();
    return res.json(
      responseWrapper(
        users,
        "get_users_service",
        "Users retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "get_users_service", "Internal Server Error", false)
      );
  }
};

const getUserById = async (req, res) => {
  const { id } = req.params;

  try {
    const user = await userService.get_user_service(id);
    return res.json(
      responseWrapper(
        user,
        "get_user_service",
        "User retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "get_user_service", "Internal Server Error", false)
      );
  }
};

const createUser = async (req, res) => {
  try {
    const user_before_send = req.body;
    console.log("user_before_send: \n " + user_before_send + "\n");
    const user = await userService.create_user_service(req.body);
    return res
      .status(201)
      .json(
        responseWrapper(
          user,
          "create_user_service",
          "User created successfully",
          true
        )
      );
  } catch (error) {
    console.error(error);
    if (Array.isArray(error) && error.every(e => e instanceof ValidationError)) {
      return res.status(400).json(
        responseWrapper(null, "create_user_service", error, false)
      );
    }

    return res.status(500).json(
      responseWrapper(null, "create_user_service", "Internal Server Error", false)
    );
  }
};

const updateUser = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedUser = await userService.update_user_service(id, req.body);
    if (!updatedUser) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "update_user_service", "User not found", false)
        );
    }

    return res.json(
      responseWrapper(
        updatedUser,
        "update_user_service",
        "User updated successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "updateUser", "Internal Server Error", false)
      );
  }
};

const deleteUser = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedUser = await userService.delete_user_service(id);
    if (!deletedUser) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "delete_user_service", "User not found", false)
        );
    }

    return res.json(
      responseWrapper(
        deletedUser,
        "delete_user_service",
        "User deleted successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "deleteUser", "Internal Server Error", false)
      );
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
};
