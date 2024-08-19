/**
 * @desc This file contains the schema for the Likes model
 */

const connection = require("../database/MySQL/connection");

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
  const [result] = await connection.execute(
    `INSERT INTO Likes (article_id, user_id)
                                       VALUES (?, ?)`,
    [article_id, user_id]
  );
  return result;
}

/**
 * @desc This method deletes a like
 * @param {number} like_id
 */
async function deleteLike(like_id) {
  const [result] = await connection.execute(
    `DELETE
                                         FROM Likes
                                         WHERE id = ?`,
    [like_id]
  );
  return result;
}

/**
 * @desc This method gets all Likes for a specific article
 * @param {number} article_id
 * @returns {Promise<*>}
 */
async function getLikesByArticle(article_id) {
  const [result] = await connection.execute(
    `SELECT *
                                         FROM Likes
                                         WHERE article_id = ?`,
    [article_id]
  );
  return result;
}

/**
 * @desc This method gets all Likes for a specific user
 * @param {number} user_id
 * @returns {Promise<*>}
 */
async function getLikesByUser(user_id) {
  const [result] = await connection.execute(
    `SELECT *
                                         FROM Likes
                                         WHERE user_id = ?`,
    [user_id]
  );
  return result;
}

/**
 * @desc This method gets a like by its id
 * @param like_id
 * @returns {Promise<*>}
 */
async function getLikeById(like_id) {
  const [result] = await connection.execute(
    `SELECT *
                                         FROM Likes
                                         WHERE id = ?`,
    [like_id]
  );
  return result;
}

/**
 * @desc This method checks if a user has liked an article
 * @param {number} article_id
 * @param {number} user_id
 * @returns {Promise<boolean>}
 */
async function hasLiked(article_id, user_id) {
  const [result] = await connection.execute(
    `SELECT *
                                         FROM Likes
                                         WHERE article_id = ? AND user_id = ?`,
    [article_id, user_id]
  );

  // check if the user has liked the article
    return result.length > 0;
}

/**
 * @desc This method gets a like by its ids
 * @param {number} article_id
 * @param {number} user_id
 * @returns {Promise}
 */
async function getLikesByIds(article_id, user_id) {
  const [result] = await connection.execute(
    `SELECT *
                                         FROM Likes
                                         WHERE article_id = ? AND user_id = ?`,
    [article_id, user_id]
  );
  return result;
}

module.exports = {
  Like,
  createLike,
  deleteLike,
  getLikesByArticle,
  getLikesByUser,
  getLikeById,
  getLikesByIds,
  hasLiked,
};
