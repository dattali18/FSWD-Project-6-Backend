/**
 * @desc This file contains the schema for the Likes model
 */

const connection = require("database/MySQL/connection");

/**
 * @desc This class represents the Likes model
 * @property {number} article_id - The id of the article that the like is associated with
 * @property {number} user_id - The id of the user that liked the article
 */
class Like {
    /**
     * @desc This method creates a new like
     * @param {number} article_id
     * @param {number} user_id
     */
    constructor(article_id, user_id) {
        this.article_id = article_id;
        this.user_id = user_id;
    }
}

/**
 * @desc This method creates a new like
 * @param {number} article_id
 * @param {number} user_id
 */
async function createLike(article_id, user_id) {
    const [result] = connection.execute(`INSERT INTO likes (article_id, user_id) VALUES (?, ?)`, [article_id, user_id]);
    return result;
}

/**
 * @desc This method deletes a like
 * @param {number} like_id
 */
async function deleteLike(like_id) {
    const [result] = connection.execute(`DELETE FROM likes WHERE id = ?`, [like_id]);
    return result;
}

/**
 * @desc This method gets all likes for a specific article
 * @param {number} article_id
 * @returns {Promise<*>}
 */
async function getLikesByArticle(article_id) {
    const [result] = connection.execute(`SELECT * FROM likes WHERE article_id = ?`, [article_id]);
    return result;
}

/**
 * @desc This method gets all likes for a specific user
 * @param {number} user_id
 * @returns {Promise<*>}
 */
async function getLikesByUser(user_id) {
    const [result] = connection.execute(`SELECT * FROM likes WHERE user_id = ?`, [user_id]);
    return result;
}

module.exports = {
    Like,
    createLike,
    deleteLike,
    getLikesByArticle,
    getLikesByUser
}