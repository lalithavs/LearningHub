const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/user");
const Student = require("../models/student");
const Teacher = require("../models/teacher");
const Attendance = require("../models/attendance");

exports.createUser = (req, res, next) => {
  bcrypt.hash(req.body.password, 10).then((hash) => {
    const user = new User({
      email: req.body.email,
      password: hash,
    });
    user
      .save()
      .then((result) => {
        res.status(201).json({
          message: "User created!",
          result: result,
        });
      })
      .catch((err) => {
        res.status(500).json({
          message: "Invalid authentication credentials!",
        });
      });
  });
};

exports.userLogin = (req, res, next) => {
  let fetchedUser;
  console.log(req.body.email);
  User.findOne({ email: req.body.email })
    .then((user) => {
      if (!user) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      fetchedUser = user;
      return bcrypt.compare(req.body.password, user.password);
    })
    .then((result) => {
      if (!result) {
        return res.status(401).json({
          message: "Auth failed",
        });
      }
      const token = jwt.sign(
        {
          email: fetchedUser.email,
          userId: fetchedUser._id,
        },
        "secret_this_should_be_longer",
        { expiresIn: "1h" }
      );
      res.status(200).json({
        token: token,
        expiresIn: 3600,
        userId: fetchedUser._id,
        role: fetchedUser.role,
        userLogin: fetchedUser.email,
      });
    })
    .catch((err) => {
      return res.status(401).json({
        message: "Invalid authentication credentials!",
      });
    });
};

exports.searchUser = (req, res, next) => {
  console.log(req.body);
  if (req.body.role === "Teacher") {
    Teacher.findOne({ teacherId: req.body.search })
      .then((teacher) => {
        if (!teacher) {
          return res.status(404).json({
            message: "Teacher not found",
          });
        }
        res.status(200).json({ message: "Teacher found", user: teacher });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Teacher search failed",
        });
      });
  } else {
    Student.findOne({ admissionNumber: req.body.search })
      .then((student) => {
        if (!student) {
          return res.status(404).json({
            message: "Student not found",
          });
        }
        res.status(200).json({ message: "Student found", user: student });
      })
      .catch((error) => {
        res.status(500).json({
          message: "Student search failed",
        });
      });
  }
};

exports.markAttendance = (req, res, next) => {
  console.log(req.body);
  const attendance = new Attendance({
    userId: req.body.id,
    date: req.body.today,
  });
  attendance
    .save()
    .then(() => {
      res.status(201).json({ message: "Attendance marked successfully." });
    })
    .catch(() => {
      res.status(500).json({ message: "Attendance could not be marked." });
    });
};

exports.getAttendance = (req, res, next) => {
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  Attendance.findOne({ userId: req.body.id, date: today })
    .then((result) => {
      if (result !== null) {
        res.status(200).json({ attended: true });
      } else {
        res.status(200).json({ attended: false });
      }
    })
    .catch(() => {
      res
        .status(500)
        .json({ messsage: "Unable to retrieve attendance details." });
    });
};

exports.viewAttendance = (req, res, next) => {
  console.log("Inside view attendance", req.body.id);
  Attendance.find({ userId: req.body.id })
    .sort({ date: 1 })
    .then((result) => {
      console.log(result);
      res
        .status(200)
        .json({ message: "Attendance details found.", details: result });
    })
    .catch(() => {
      res.status(500).json({ message: "Attendance details not found." });
    });
};
