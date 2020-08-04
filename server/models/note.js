const mongoose = require("mongoose");

const noteSchema = mongoose.Schema({
  standard: { type: String, required: true },
  subject: { type: String, required: true },
  title: { type: String, required: true },
  notes: { type: String, required: true },
  creator: { type: String, required: true },
  date: { type: Date, default: Date.now },
});

module.exports = mongoose.model("Note", noteSchema);
