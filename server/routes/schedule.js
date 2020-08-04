const express = require("express");

const ScheduleController = require("../controllers/schedule");

const checkAuth = require("../middleware/check-auth");
// const extractFile = require("../middleware/file");

const router = express.Router();

router.post("/addSchedule", checkAuth, ScheduleController.addSchedule);
router.get("", checkAuth, ScheduleController.getSchedule);

module.exports = router;
