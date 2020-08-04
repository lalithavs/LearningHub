const mongoose = require("mongoose");

const attendanceSchema = mongoose.Schema({
  userId: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Attendance", attendanceSchema);
