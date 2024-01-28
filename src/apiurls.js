const express = require("express");
const router = express.Router();
const articleUrls = require("./article/urls");
const programUrls = require("./program/urls");
const replyUrls = require("./reply/urls");
const reservationUrls = require("./reservation/urls");
const tripUrls = require("./trip/urls");

router.use("/article", articleUrls);
router.use("/program", programUrls);
router.use("/reply", replyUrls);
router.use("/reservation", reservationUrls);
router.use("/trip", tripUrls);

module.exports = router;
