const Schedule = require("../models/schedule");

exports.addSchedule = (req, res, next) => {
  const schedule = new Schedule({
    standard: req.body.standard,
    day: req.body.day,
    time: req.body.time,
    subject: req.body.subject,
    link: req.body.link,
  });
  schedule
    .save()
    .then(() => {
      res.status(201).json({
        message: "Schedule added successfully",
      });
    })
    .catch(() => {
      res.status(500).json({
        message: "Creating a schedule failed!",
      });
    });
};

exports.getSchedule = (req, res, next) => {
  const pageSize = +req.query.pagesize;
  const currentPage = +req.query.page;
  const postQuery = Schedule.find();
  let fetchedPosts;
  if (pageSize && currentPage) {
    postQuery.skip(pageSize * (currentPage - 1)).limit(pageSize);
  }
  postQuery
    .then((documents) => {
      fetchedPosts = documents;
      return Schedule.count();
    })
    .then((count) => {
      res.status(200).json({
        message: "Schedule fetched successfully!",
        posts: fetchedPosts,
        maxPosts: count,
      });
    })
    .catch((error) => {
      res.status(500).json({
        message: "Fetching schedule failed!",
      });
    });
};
