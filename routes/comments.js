const express = require('express');
const router = express.Router();

const auth = require('../middleware/authMiddleware');

const commentsModel = require('../models/Comments');

/**
 * @desc Create a comment
 * @path POST api/comments
 * @access Private
 * @body {number} article_id
 * @body {string} content
 */
router.post("/", auth, async (req, res) => {
    const {article_id, content} = req.body;

    // check if the article_id and content are provided
    if (!article_id || !content) {
        return res.status(400).send('Please provide article_id and content');
    }

    const user_id = req.user.id;

    try {
        const result = await commentsModel.createComment(article_id, user_id, content);
        return res.status(201).send(result);
    } catch (error) {
        console.error('Error in creating comment', error);
        return res.status(500).send('Internal Server Error');
    }
});

/**
 * @desc Delete a comment
 * @path DELETE api/comments/:id
 * @access Private
 * @param {number} id
 */
router.delete("/:id", auth, async (req, res) => {
    const id = req.params.id;
    const user_id = req.user.id;

    if (!id) {
        return res.status(400).send('Please provide article_id');
    }

    try {
        const [comment] = await commentsModel.getCommentById(id);

        if (!comment) {
            return res.status(404).send('Comment not found');
        }

        // check if the user is the owner of the comment
        if (comment.user_id !== user_id) {
            return res.status(403).send('You are not authorized to delete this comment');
        }

        const result = await commentsModel.removeComment(comment.id);

        if (result.affectedRows === 1) {
            return res.status(200).send('Comment deleted successfully');
        }

        return res.status(500).send('Internal Server Error');
    } catch (error) {
        console.error('Error in deleting comment', error);
        return res.status(500).send('Internal Server Error');
    }
});

/**
 * @desc update a comment
 * @path PUT api/comments/
 * @access Private
 * @body {string} content
 * @body {number} article_id
 * @body {number} user_id
 */
router.put("/", auth, async (req, res) => {
    let {content, article_id} = req.body;
    let user_id = req.user.id;

    if (!content || !article_id) {
        return res.status(400).send('Please provide content and article_id');
    }

    // parse the article_id, user_id to integer
    try {
        article_id = parseInt(article_id);
        user_id = parseInt(user_id);
    } catch (error) {
        return res.status(400).send('Invalid article_id or user_id');
    }

    try {
        const [comment] = await commentsModel.getCommentByIds(article_id, user_id);

        if (!comment) {
            return res.status(404).send('Comment not found');
        }
        let id = comment.id;

        const result = await commentsModel.updateComment(id, content);

        if (result.affectedRows === 1) {
            return res.status(200).send('Comment updated successfully');
        }

        return res.status(500).send('Internal Server Error');
    } catch (error) {
        console.error('Error in updating comment', error);
        return res.status(500).send('Internal Server Error');
    }
});

/**
 * @desc get all the comment on an article
 * @path GET api/comments/:article_id
 * @access Public
 * @param {number} article_id
 */
router.get("/article/:article_id", async (req, res) => {
    const article_id = req.params.article_id;

    try {
        const comments = await commentsModel.getComments(article_id);
        return res.status(200).send(comments);
    } catch (error) {
        console.error('Error in getting comments', error);
        return res.status(500).send('Internal Server Error');
    }
});

/**
 * @desc get all the comment of a user
 * @path GET api/comments/user/:user_id
 * @access Public
 * @param {number} user_id
 */
router.get("/user/:user_id", async (req, res) => {
    const user_id = req.params.user_id;

    try {
        const comments = await commentsModel.getUserComments(user_id);
        return res.status(200).send(comments);
    } catch (error) {
        console.error('Error in getting comments', error);
        return res.status(500).send('Internal Server Error');
    }
});


module.exports = router;
