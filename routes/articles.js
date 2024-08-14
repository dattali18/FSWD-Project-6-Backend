const express = require('express');
const router = express.Router();

const Article = require('../models/Articles');

/**
 * @desc get an article by id
 * @path GET /articles/:id
 * @parm {number} id - article id
 * @access Public
 */
router.get('/:id', async (req, res) => {
    try {
        const article = await Article.findById(req.params.id);
        res.json(article);
    } catch (error) {
        res.json({message: error});
    }
});

/**
 * @desc get all articles
 * @path GET /articles
 * @access Public
 * @param {number} limit - limit the number of articles
 * @param {number} page - page number
 */
router.get('/', async (req, res) => {
        // if no limit or page is provided return all articles
        const limit = req.query.limit;
        const page = req.query.page;

        if(!limit || !page) {
            try {
                const articles = await Article.find();
                res.json(articles);
            } catch (error) {
                res.json({message: error});
            }
        }

        try {
            const articles = await Article.find()
                .limit(limit)
                .skip(limit * (page - 1));
            res.json(articles);
        } catch (error) {
            res.json({message: error});
        }
    }
);

module.exports = router;
