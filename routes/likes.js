const express = require('express');
const router = express.Router();

const auth = require('../middleware/adminMiddleware');
const likeModel = require('../models/Likes');


/**
 * @desc Create a like
 * @route POST api/likes
 * @access Private
 * @body {number} article_id
 */
router.post('/', auth, async (req, res) => {
    const { article_id } = req.body;
    const user_id = req.user.id;

    if(!article_id) {
        return res.status(400).send('Please provide article_id');
    }

    try {
        const result = await likeModel.createLike(article_id, user_id);
        return res.status(201).json(result);
    } catch (error) {
        console.error(error);
        return res.status(500).send('Server error');
    }
});


module.exports = router;
