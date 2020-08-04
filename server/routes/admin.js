const express = require("express");

const AdminController = require("../controllers/admin");

const checkAuth = require("../middleware/check-auth");
// const extractFile = require("../middleware/file");

const router = express.Router();

router.post("/addStudent", checkAuth, AdminController.addStudent);
router.post("/addTeacher", checkAuth, AdminController.addTeacher);
router.put("/updateTeacher/:id", checkAuth, AdminController.updateTeacher);
router.put("/updateStudent/:id", checkAuth, AdminController.updateStudent);
router.delete("/deleteTeacher/:id", checkAuth, AdminController.deleteTeacher);
router.delete("/deleteStudent/:id", checkAuth, AdminController.deleteStudent);

module.exports = router;
