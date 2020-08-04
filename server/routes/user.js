const express = require("express");

const UserController = require("../controllers/user");

const checkAuth = require("../middleware/check-auth");

const router = express.Router();

router.post("/signup", UserController.createUser);
router.post("/login", UserController.userLogin);
router.post("/searchUser", checkAuth, UserController.searchUser);
router.post("/markAttendance", checkAuth, UserController.markAttendance);
router.post("/viewAttendance", checkAuth, UserController.viewAttendance);
router.post("/attendanceStatus", checkAuth, UserController.getAttendance);

module.exports = router;
