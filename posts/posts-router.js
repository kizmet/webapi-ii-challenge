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

router.post("/", (req, res) => {
  const post = req.body;
    Posts.insert(post)
      .then(post => {
        res.status(201).json(post);
      })
      .catch(error => {
        res.status(500).json({
          message: "There was an error while saving the post to the database"
        });
      });

});

router.delete("/:id", (req, res) => {
  const postId = req.params.id;
  let foundPost;
  Posts.findById(postId)
    .then(post => {
      foundPost = post;
      Posts.remove(postId)
        .then(post => {
          if (post) {
            res.status(200).json(foundPost);
          } else {
            res.status(404).json({
              message: "The post with the specified ID does not exist"
            });
          }
        })
        .catch(error => {
          res
            .status(500)
            .json({ message: "Could not find a post with that ID" });
        });
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "There was an error finding that post by ID" });
    });
});


router.post("/:id/comments", (req, res) => {
  const commentInfo = req.body;
  commentInfo.post_id = req.params.id;
  if (commentInfo.text) {
    Posts.insertComment(commentInfo)
      .then(comment => {
        if (comment) {
          res.status(201).json(commentInfo);
        } else {
          res.status(500).json({
            message: "There was an error saving the comment to the database"
          });
        }
      })
      .catch(error => {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      });
  } else {
    res.status(400).json({ message: "Please provide text for the comment" });
  }
});

router.get("/:id/comments", (req, res) => {
  const postId = req.params.id;
  Posts.findPostComments(postId)
    .then(comment => {
      if (comment.length > 0) {
        res.status(200).json(comment);
      } else {
        res
          .status(404)
          .json({ message: "The post with the specified ID does not exist" });
      }
    })
    .catch(error => {
      res
        .status(500)
        .json({ message: "The comments information could not be retrieved" });
    });
});

module.exports = router;
