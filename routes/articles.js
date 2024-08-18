const express = require("express");
const router = express.Router();

const isWriter = require("../middleware/writerMiddleware");

const Article = require("../models/Articles");

/**
 * @desc get an article by id
 * @path GET /articles/:id
 * @parm {number} id - article id
 * @access Public
 */
router.get("/:id", async (req, res) => {
  let id = req.params.id;
  // can't access this path why??
  id = parseInt(id);
  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  try {
    const article = await Article.getArticlesById(id);
    return res.status(200).json({ article: article });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Article not found" });
  }
});

/**
 * @desc get all articles
 * @path GET /articles
 * @access Public
 * @param {number} limit - limit the number of articles
 * @param {number} page - page number
 */
router.get("/", async (req, res) => {
  // if no limit or page is provided return all articles
  let limit = req.query.limit;
  let page = req.query.page;

  if (!limit || !page) {
    try {
      const articles = await Article.getArticles();
      return res.status(200).json({ articles: articles });
    } catch (error) {
      console.log(error);
      return res.status(400).json({ message: error });
    }
  }

  try {
    // try and parse the limit and page
    limit = parseInt(limit);
    page = parseInt(page);
  } catch (e) {
    return res.status(400).json({ message: "Invalid limit or page" });
  }

  try {
    let articles = await Article.getArticles();
    // apply pagination
    articles = articles.slice((page - 1) * limit, page * limit);
    // add field for current page and total pages
    let body = {
      articles: articles,
      page: page,
      totalPages: Math.ceil(articles.length / limit),
    };

    return res.status(200).json(body);
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: error });
  }
});

/**
 * @desc create an article
 * @path POST /articles
 * @access Public
 * @param {string} title - article title
 * @param {string} content - article body
 * @param {number} author - article author (user id)
 * @param {[string]} tags - article tags
 */
router.post("/", isWriter, async (req, res) => {
  const article = {
    title: req.body.title,
    content: req.body.content,
    author: req.user.id,
    tags: req.body.tags,
  };

  try {
    const savedArticle = await Article.createArticle(article);
    return res.status(201).json({ article: savedArticle });
  } catch (error) {
    return res.status(400).json({ message: error });
  }
});

/**
 * @desc update an article
 * @path PUT /articles/:id
 * @access Public
 * @param {number} id - article id
 * @param {string} title - article title
 * @param {string} content - article body
 * @param {[string]} tags - article tags
 */
router.put("/:id", isWriter, async (req, res) => {
  let id = req.params.id;
  id = parseInt(id);

  if (isNaN(id)) {
    return res.status(400).json({ message: "Invalid id" });
  }

  // check if the user is the author of the article
  const article = await Article.getArticlesById(id);
  if (article.author !== req.user.id) {
    return res.status(401).json({ message: "Unauthorized" });
  }

  const articleObject = {
    title: req.body.title,
    content: req.body.content,
    tags: req.body.tags,
  };

  try {
    const updatedArticle = await Article.updateArticle(id, articleObject);
    return res.status(200).json({ article: updatedArticle });
  } catch (error) {
    console.log(error);
    return res.status(400).json({ message: "Article not found" });
  }
});

module.exports = router;
