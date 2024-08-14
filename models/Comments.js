/**
 * @desc This file contains the schema for the comments collection
 */

const connection = require('../database/MySQL/connection');

/**
 * @desc This function creates the comments table
 * @property {number} article_id - The id of the article
 * @property {number} user_id - The id of the user
 * @property {string} content - The content of the comment
 */
class Comments {
    /**
     * @desc This function creates the comments table
     * @param {number} article_id
     * @param {number} user_id
     * @param {string} content
     */
    constructor(article_id, user_id, content) {
        this.article_id = article_id
        this.user_id = user_id
        this.content = content
    }
}

/**
 * @desc This function creates a comment
 * @param {number} article_id
 * @param {number} user_id
 * @param {string} content
 * @returns {Promise<*>}
 */
async function createComment(article_id, user_id, content) {
    const [rows] = await connection.execute('INSERT INTO comments (article_id, user_id, content) VALUES (?, ?, ?)', [article_id, user_id, content]);
    return rows;
}

/**
 * @desc This function removes a comment
 * @param {number} comment_id
 */
async function removeComment(comment_id) {
   const [result] =  await connection.execute('DELETE FROM comments WHERE id = ?', [comment_id]);
    return result;
}

/**
 * @desc This function gets all the comments for a specific article
 * @param {number} article_id
 * @returns {Promise<*>}
 */
async function getComments(article_id) {
    const [rows] = await connection.execute('SELECT * FROM comments WHERE article_id = ?', [article_id]);
    return rows;
}

/**
 * @desc This function gets all the comments for a specific user
 * @param {number} user_id
 * @returns {Promise<*>}
 */
async function getUserComments(user_id) {
    const [rows] = await connection.execute('SELECT * FROM comments WHERE user_id = ?', [user_id]);
    return rows;
}

module.exports = {
    Comments,
    createComment,
    removeComment,
    getComments,
    getUserComments
};