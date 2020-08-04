const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const Student = require("../models/student");
const Teacher = require("../models/teacher");
const User = require("../models/user");

exports.addStudent = (req, res, next) => {
  const student = new Student({
    fullName: req.body.fullName,
    standard: req.body.standard,
    motherName: req.body.motherName,
    fatherName: req.body.fatherName,
    dob: req.body.dob,
    gender: req.body.gender,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    postalCode: req.body.postalCode,
    admissionNumber: req.body.admissionNumber,
  });
  student
    .save()
    .then(() => {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
          email: req.body.admissionNumber,
          password: hash,
          role: req.body.role,
        });
        user
          .save()
          .then((result) => {
            res.status(201).json({
              message: "Student created!",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "User creation failed",
            });
          });
      });
    })
    .catch(() => {
      res.status(500).json({
        message:
          "Admission number already exists. Please enter another Admission number.",
      });
    });
};

exports.addTeacher = (req, res, next) => {
  const teacher = new Teacher({
    fullName: req.body.fullName,
    subjects: req.body.subjects,
    standards: req.body.standards,
    teacherId: req.body.teacherId,
  });
  teacher
    .save()
    .then(() => {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        const user = new User({
          email: req.body.teacherId,
          password: hash,
          role: req.body.role,
        });
        console.log("Inside add user", user);
        user
          .save()
          .then((result) => {
            res.status(201).json({
              message: "Teacher created!",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "User creation failed",
            });
          });
      });
    })
    .catch((err) => {
      res.status(500).json({
        message: "Teacher ID already exists. Please enter another Teacher ID.",
      });
    });
};

exports.updateTeacher = (req, res, next) => {
  console.log("Update Teacher", req.body, req.params.id);
  const teacher = {
    fullName: req.body.fullName,
    subjects: req.body.subjects,
    standards: req.body.standards,
    teacherId: req.body.teacherId,
  };
  Teacher.findByIdAndUpdate({ _id: req.params.id }, teacher)
    .then(() => {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        User.findOneAndUpdate({ email: req.body.teacherId }, { password: hash })
          .then((result) => {
            res.status(201).json({
              message: "Teacher details updated successfully.",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Password could not be updated.",
            });
          });
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Teacher details could not be updated.",
      });
    });
};

exports.updateStudent = (req, res, next) => {
  console.log("Update Student", req.body, req.params.id);
  const student = {
    fullName: req.body.fullName,
    standard: req.body.standard,
    motherName: req.body.motherName,
    fatherName: req.body.fatherName,
    dob: req.body.dob,
    gender: req.body.gender,
    address: req.body.address,
    city: req.body.city,
    state: req.body.state,
    postalCode: req.body.postalCode,
    admissionNumber: req.body.admissionNumber,
  };
  Student.findByIdAndUpdate({ _id: req.params.id }, student)
    .then(() => {
      bcrypt.hash(req.body.password, 10).then((hash) => {
        User.findOneAndUpdate(
          { email: req.body.admissionNumber },
          { password: hash }
        )
          .then((result) => {
            res.status(201).json({
              message: "Student details updated.",
            });
          })
          .catch((err) => {
            res.status(500).json({
              message: "Password could not be updated.",
            });
          });
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Student details could not be updated.",
      });
    });
};

exports.deleteStudent = (req, res, next) => {
  Student.findByIdAndDelete(req.params.id)
    .then((result) => {
      User.findOneAndDelete({ email: result.admissionNumber })
        .then(() => {
          res.status(200).json({ message: "Student details deleted." });
        })
        .catch(() => {
          res.status(500).json({ message: "Student could not be deleted." });
        });
    })
    .catch(() => {
      res.status(500).json({ message: "Student could not be deleted." });
    });
};

exports.deleteTeacher = (req, res, next) => {
  Teacher.findByIdAndDelete(req.params.id)
    .then((result) => {
      User.findOneAndDelete({ email: result.teacherId })
        .then(() => {
          res.status(200).json({ message: "Teacher details deleted." });
        })
        .catch(() => {
          res.status(500).json({ message: "Teacher could not be deleted." });
        });
    })
    .catch(() => {
      res.status(500).json({ message: "Teacher could not be deleted." });
    });
};
