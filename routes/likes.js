const express = require("express");
const router = express.Router();

const auth = require("../middleware/authMiddleware");
const likeModel = require("../models/Likes");

/**
 * @desc Create a like
 * @route POST api/likes
 * @access Private
 * @body {number} article_id
 */
router.post("/", auth, async (req, res) => {
  const article_id = req.body.article_id;
  const user_id = req.user.id;

  if (!article_id) {
    return res.status(400).send("Please provide article_id");
  }

  try {
    // check if the user has already liked the article
    const hasLiked = await likeModel.hasLiked(article_id, user_id);
    if (hasLiked) {
      return res.status(400).send("You have already liked this article");
    }
    const result = await likeModel.createLike(article_id, user_id);
    return res.status(201).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

// TEST
/**
 * @desc Delete a like
 * @route DELETE api/likes
 * @access Private
 * @body {number} article_id
 */
router.delete("/", auth, async (req, res) => {
  let article_id = req.query.article_id;
  const user_id = req.user.id;

  if (!article_id) {
    return res.status(400).send("Please provide article_id");
  }

  article_id = parseInt(article_id);
  // Check if article_id is a number
  if (isNaN(article_id)) {
    return res.status(400).send("Invalid article_id");
  }

  // Check if the user is the owner of the like
  try {
    const [like] = await likeModel.getLikesByIds(article_id, user_id);

    // if the like does not exist
    if (!like) {
      return res.status(400).send("You have not liked this article");
    }

    const like_id = like.id;

    // remove the like
    const result = await likeModel.deleteLike(like_id);

    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

// TEST
/**
 * @desc Get all likes for a specific article
 * @route GET api/likes/article/:article_id
 * @access Public
 * @param {number} article_id
 */
router.get("/article/:article_id", async (req, res) => {
  let { article_id } = req.params;

  article_id = parseInt(article_id);
  if (isNaN(article_id)) {
    return res.status(400).send("Invalid article_id");
  }

  try {
    const result = await likeModel.getLikesByArticle(article_id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

// TEST
/**
 * @desc Get all likes for a specific user
 * @route GET api/likes/user/:user_id
 * @access Public
 * @param {number} user_id
 */
router.get("/user/:user_id", async (req, res) => {
  let { user_id } = req.params;

  user_id = parseInt(user_id);
  if (isNaN(user_id)) {
    return res.status(400).send("Invalid user_id");
  }

  try {
    const result = await likeModel.getLikesByUser(user_id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

/**
 * @desc return if the user has liked the article
 * @route GET api/likes/liked
 * @access Private
 * @param {number} article_id
 */
router.get("/liked", auth, async (req, res) => {
  const article_id = req.query.article_id;
  const user_id = req.user.id;

  // console.log("article_id", article_id, "user_id", user_id);

  if (!article_id) {
    console.log(JSON.stringify(req.body));

    return res.status(400).send(`Please provide article_id current`);
  }

  try {
    const result = await likeModel.hasLiked(article_id, user_id);
    return res.status(200).json(result);
  } catch (error) {
    console.log(error);
    return res.status(500).send("Server error");
  }
});

module.exports = router;
