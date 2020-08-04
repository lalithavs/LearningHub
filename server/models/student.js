const mongoose = require("mongoose");

const studentSchema = mongoose.Schema({
  fullName: { type: String, required: true },
  standard: { type: String, required: true },
  motherName: { type: String, required: true },
  fatherName: { type: String, required: true },
  dob: { type: Date, default: Date.now },
  gender: { type: String, required: true },
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
  postalCode: { type: Number, required: true },
  admissionNumber: { type: String, required: true, unique: true },
});

module.exports = mongoose.model("Student", studentSchema);
