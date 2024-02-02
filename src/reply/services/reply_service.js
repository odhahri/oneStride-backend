const path = require("path");
const { Op } = require("sequelize");
const { Reply } = require("../../../sequelize_config/models");
const { plainToInstance } = require("class-transformer");
const { validate } = require("class-validator");
const { ReplyDTO } = require("../../../compiled/reply/serializers/reply_serializer");

const get_replies_service = async () => {
  try {
    return await Reply.findAll();
  } catch (error) {
    throw error;
  }
};

const get_reply_service = async (id) => {
  return await Reply.findByPk(id);
};

const create_reply_service = async (data) => {
  try {
    const reply_serializer = plainToInstance(ReplyDTO, data);
    const errors = await validate(reply_serializer);

    if (errors.length > 0) {
      throw errors;
    }

    return await Reply.create(reply_serializer);
  } catch (error) {
    console.error("Error in createReply:", error);
    throw error;
  }
};

const update_reply_service = async (id, updatedData) => {
  const reply = await Reply.findByPk(id);
  await reply.update(updatedData);
  return reply;
};

const delete_reply_service = async (id) => {
  const reply = await Reply.findByPk(id);
  await reply.destroy();
  return reply;
};

const filter_replies_service = async (filters) => {
  const replies = await Reply.findAll({
    where: {
      [Op.or]: [
        { content: { [Op.iLike]: `%${filters}%` } },
        // Add more conditions if needed
      ],
    },
  });
  return replies;
};


module.exports = {
  get_replies_service,
  get_reply_service,
  create_reply_service,
  update_reply_service,
  delete_reply_service,
  filter_replies_service,
};
