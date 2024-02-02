const path = require("path");
const replyService = require("../../../src/reply/services/reply_service");
const responseWrapper = require("../../../core/helpers/responseWrapper");
const { ValidationError } = require('class-validator');

const getAllReplies = async (req, res) => {
  try {
    const replies = await replyService.get_replies_service();
    return res.json(
      responseWrapper(
        replies,
        "get_replies_service",
        "Replies retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "get_replies_service", "Internal Server Error", false)
      );
  }
};

const getReplyById = async (req, res) => {
  const { id } = req.params;

  try {
    const reply = await replyService.get_reply_service(id);
    return res.json(
      responseWrapper(
        reply,
        "get_reply_service",
        "Reply retrieved successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "get_reply_service", "Internal Server Error", false)
      );
  }
};

const createReply = async (req, res) => {
  try {
    const reply_before_send = req.body;
    console.log("reply_before_send: \n " + reply_before_send + "\n");
    const reply = await replyService.create_reply_service(req.body);
    return res
      .status(201)
      .json(
        responseWrapper(
          reply,
          "create_reply_service",
          "Reply created successfully",
          true
        )
      );
  } catch (error) {
    console.error(error);
    if (Array.isArray(error) && error.every(e => e instanceof ValidationError)) {
      return res.status(400).json(
        responseWrapper(null, "create_reply_service", error, false)
      );
    }

    return res.status(500).json(
      responseWrapper(null, "create_reply_service", "Internal Server Error", false)
    );
  }
};

const updateReply = async (req, res) => {
  const { id } = req.params;

  try {
    const updatedReply = await replyService.update_reply_service(id, req.body);
    if (!updatedReply) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "update_reply_service", "Reply not found", false)
        );
    }

    return res.json(
      responseWrapper(
        updatedReply,
        "update_reply_service",
        "Reply updated successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "updateReply", "Internal Server Error", false)
      );
  }
};

const deleteReply = async (req, res) => {
  const { id } = req.params;

  try {
    const deletedReply = await replyService.delete_reply_service(id);
    if (!deletedReply) {
      return res
        .status(404)
        .json(
          responseWrapper(null, "delete_reply_service", "Reply not found", false)
        );
    }

    return res.json(
      responseWrapper(
        deletedReply,
        "delete_reply_service",
        "Reply deleted successfully",
        true
      )
    );
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json(
        responseWrapper(null, "deleteReply", "Internal Server Error", false)
      );
  }
};

module.exports = {
  getAllReplies,
  getReplyById,
  createReply,
  updateReply,
  deleteReply,
};
