const mongoose = require("mongoose");

const scheduleSchema = mongoose.Schema({
  standard: { type: String, required: true },
  day: { type: String, required: true },
  time: { type: String, required: true },
  subject: { type: String, required: true },
  link: { type: String, required: true },
});

module.exports = mongoose.model("Schedule", scheduleSchema);
