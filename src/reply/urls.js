const express = require("express");
const path = require("path");
const router = express.Router();
const replyController = require(path.join(__dirname, "controllers/reply_crud"));

router.get("/get-all-replies", replyController.getAllReplies);
router.get("/get-reply-by-id/:id", replyController.getReplyById);
router.post("/create-reply", replyController.createReply);
router.put("/update-reply-by-id/:id", replyController.updateReply);
router.delete("/delete-reply-by-id/:id", replyController.deleteReply);

module.exports = router;
