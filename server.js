const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
// import routers
const PostsRouter = require("./posts/posts-router.js");

// create server using express
const server = express();

// use middleware before routers
server.use(helmet());
server.use(express.json());
server.use(cors());
//server.use(morgan("dev"));


// setup paths for routers
server.use("/api/posts", PostsRouter);

// GET request to root / to make sure everything is working
server.get("/", (req, res) => {
  res.json({ message: "API is up and running!" });
});

// export server
module.exports = server;