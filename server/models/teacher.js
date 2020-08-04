const mongoose = require("mongoose");

const teacherSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  subjects: { type: Array, required: true },
  standards: { type: Array, required: true },
  teacherId: { type: String, require: true, unique: true },
});

module.exports = mongoose.model("Teacher", teacherSchema);
