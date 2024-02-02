const { User } = require("../../../sequelize_config/models");
const { plainToInstance } = require("class-transformer");
const { validate } = require("class-validator");
const { UserDTO } = require("../../../compiled/user/serializers/user_serializer");

const get_users_service = async () => {
  try {
    return await User.findAll();
  } catch (error) {
    throw error;
  }
};

const get_user_service = async (id) => {
  return await User.findByPk(id);
};

const create_user_service = async (data) => {
  try {
    const user_serializer = plainToInstance(UserDTO, data);
    const errors = await validate(user_serializer);

    if (errors.length > 0) {
      throw errors;
    }

    return await User.create(user_serializer);
  } catch (error) {
    console.error("Error in createUser:", error);
    throw error;
  }
};

const update_user_service = async (id, updatedData) => {
  const user = await User.findByPk(id);
  await user.update(updatedData);
  return user;
};

const delete_user_service = async (id) => {
  const user = await User.findByPk(id);
  await user.destroy();
  return user;
};

module.exports = {
  get_users_service,
  get_user_service,
  create_user_service,
  update_user_service,
  delete_user_service,
};
