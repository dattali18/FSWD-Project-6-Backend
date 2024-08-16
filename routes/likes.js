const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');
const likeModel = require('../models/Likes');


/**
 * @desc Create a like
 * @route POST api/likes
 * @access Private
 * @body {number} article_id
 */
router.post('/', auth, async (req, res) => {
    const {article_id} = req.body;
    const user_id = req.user.id;

    if (!article_id) {
        return res.status(400).send('Please provide article_id');
    }

    try {
        const result = await likeModel.createLike(article_id, user_id);
        return res.status(201).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
});

// TEST
/**
 * @desc Delete a like
 * @route DELETE api/likes
 * @access Private
 * @body {number} like_id
 */
router.delete('/', auth, async (req, res) => {
    const {like_id} = req.body;
    const user_id = req.user.id;

    if (!like_id) {
        return res.status(400).send('Please provide like_id');
    }

    // Check if the user is the owner of the like
    try {
        const like = await likeModel.getLikeById(like_id);
        if (like.user_id !== user_id) {
            return res.status(401).send('Unauthorized');
        }
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }

    try {
        const result = await likeModel.deleteLike(like_id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
})

// TEST
/**
 * @desc Get all likes for a specific article
 * @route GET api/likes/article/:article_id
 * @access Public
 * @param {number} article_id
 */
router.get('/article/:article_id', async (req, res) => {
    const {article_id} = req.params;

    try {
        const result = await likeModel.getLikesByArticle(article_id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
});

// TEST
/**
 * @desc Get all likes for a specific user
 * @route GET api/likes/user/:user_id
 * @access Public
 * @param {number} user_id
 */
router.get('/user/:user_id', async (req, res) => {
    const {user_id} = req.params;

    try {
        const result = await likeModel.getLikesByUser(user_id);
        return res.status(200).json(result);
    } catch (error) {
        console.log(error);
        return res.status(500).send('Server error');
    }
});


module.exports = router;
