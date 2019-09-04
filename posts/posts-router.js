const router = require("express").Router();

const Posts = require("../data/db");

router.get("/", (req, res) => {
  Posts.find()
    .then(posts => {
      res.json(posts);
    })
    .catch(err =>
      res.status(500).json({ message: "Could not get all players from the DB" })
    );
});

router.get("/:id", (req, res) => {
  const { id } = req.params;
  Posts.findById(id)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "Could not find a post with that ID in the db" });
      }
    })
    .catch(err =>
      res.status(500).json({ message: "Could not get post from the DB" })
    );
});

router.put("/:id", (req, res) => {
  const post = req.body;
  const { id } = req.params;
  Posts.update(id, post)
    .then(post => {
      if (post) {
        res.status(200).json(post);
      } else {
        res
          .status(404)
          .json({ message: "Could not find a post with that ID in the db" });
      }
    })
    .catch(error => {
      res.status(500).json({ message: "Could not update post in the DB" });
    });
});

module.exports = router;
