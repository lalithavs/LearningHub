"use strict";
// Import Node and 3rd party modules
const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

// Import local modules
const userRoutes = require("./server/routes/user");
const notesRoutes = require("./server/routes/notes");
const scheduleRoutes = require("./server/routes/schedule");
const adminRoutes = require("./server/routes/admin");

// Initialize config variables
const db = new (require("./server/config/dbconfig"))();
const env = new (require("./server/config/envconfig"))();

const port = env.port;
const dbUrl = db.dbUrl;

// Create Express app
const app = express();

class Server {
  constructor() {
    this.initExpressMiddleware();
    this.initRoutes();
    this.initDB();
    this.start();
  }

  initDB() {
    mongoose
      .connect(dbUrl, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      })
      .then(() => console.log("MongoDB Connected"))
      .catch((err) => console.log("MongoDB Connection Error: ", err));
    mongoose.set("useNewUrlParser", true);
    mongoose.set("useFindAndModify", false);
    mongoose.set("useCreateIndex", true);
  }

  initExpressMiddleware() {
    app.use(express.json());
    app.use(cors());
    app.use("/images", express.static(path.join("server/images")));
  }

  initRoutes() {
    app.use("/api/user", userRoutes);
    app.use("/api/notes", notesRoutes);
    app.use("/api/schedule", scheduleRoutes);
    app.use("/api/admin", adminRoutes);
  }

  start() {
    app.listen(port, () => {
      console.log(`Server listening at port ${port}`);
    });
  }
}

new Server();
