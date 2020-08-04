const express = require("express");

const NoteController = require("../controllers/note");

const checkAuth = require("../middleware/check-auth");
// const extractFile = require("../middleware/file");

const router = express.Router();

router.post("/addNote", checkAuth, NoteController.addNote);
router.put("/updateNote", checkAuth, NoteController.updateNote);
router.get("", checkAuth, NoteController.getNotes);
router.get("/:id", checkAuth, NoteController.getNote);
router.delete("/:id", checkAuth, NoteController.deleteNote);

module.exports = router;
