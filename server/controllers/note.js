const Note = require("../models/note");

exports.addNote = (req, res, next) => {
  console.log("Inside add note");
  const note = new Note({
    standard: req.body.standard,
    subject: req.body.subject,
    title: req.body.title,
    notes: req.body.notes,
    creator: req.userData.userId,
  });
  console.log(note);
  note
    .save()
    .then(() => {
      res.status(201).json({
        message: "Note added successfully",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Creating a note failed!",
      });
    });
};

exports.updateNote = (req, res, next) => {
  console.log("Inside update note");
  const note = new Note({
    _id: req.body.id,
    subject: req.body.subject,
    title: req.body.title,
    notes: req.body.notes,
    creator: req.userData.userId,
  });
  Note.updateOne({ _id: req.params.id, creator: req.userData.userId }, note)
    .then((result) => {
      if (result.n > 0) {
        res.status(200).json({ message: "Update successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Couldn't udpate note!",
      });
    });
};

exports.getNotes = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Note.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((documents) => {
      fetchedPosts = documents;
      return Note.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Notes fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching notes failed!",
      });
    });
};

exports.getNote = (req, res, next) => {
  Note.findById(req.params.id)
    .then((post) => {
      if (post) {
        res.status(200).json(post);
      } else {
        res.status(404).json({ message: "Note not found!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching note failed!",
      });
    });
};

exports.deleteNote = (req, res, next) => {
  note
    .deleteOne({ _id: req.params.id, creator: req.userData.userId })
    .then((result) => {
      console.log(result);
      if (result.n > 0) {
        res.status(200).json({ message: "Deletion successful!" });
      } else {
        res.status(401).json({ message: "Not authorized!" });
      }
    })
    .catch((error) => {
      res.status(500).json({
        message: "Deleting posts failed!",
      });
    });
};
