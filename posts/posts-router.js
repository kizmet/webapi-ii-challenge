const router = require('express').Router();

const Posts = require('../data/db');

router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err =>
      res.status(500).json({ message: "Could not get all players from the DB" })
    );
});

module.exports = router;