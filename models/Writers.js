/**
 * @desc This file contains the schema for the Writers collection
 */

const connection = require('../database/MySQL/connection');

/**
 * @desc This class represents the schema for the Writers collection
 * @property {number} user_id - The user id of the writer
 * @property {string} bio - The bio of the writer
 */
class Writer {
    /**
     * @desc Constructor for the Writer class
     * @param {number} user_id
     * @param {string} bio
     */
    constructor(user_id, bio) {
        this.user_id = user_id;
        this.bio = bio;
    }
}

/**
 * @desc This function checks if a user is a writer
 * @param {number} user_id
 * @returns {Promise<boolean>}
 */
async function isUserWriter(user_id) {
    const [result] = await connection.execute('SELECT * FROM Writers WHERE user_id = ?', [user_id]);
    return result.length > 0;
}

/**
 * @desc This create a new writer
 * @param {number} user_id
 * @param {string} bio
 * @returns {Promise<*>}
 */
async function giveWriterRights(user_id, bio) {
    const [result] = connection.execute(`INSERT INTO Writers (user_id, bio)
                                         VALUES (?, ?)`, [user_id, bio]);
    return result;
}

/**
 * @desc This function removes the writer rights of a user
 * @param {number} user_id
 * @returns {Promise<*>}
 */
async function removeWriterRights(user_id) {
    const [result] = connection.execute(`DELETE FROM Writers WHERE user_id = ?`, [user_id]);
    return result;
}

module.exports = {
    Writer,
    giveWriterRights,
    removeWriterRights,
    isUserWriter
}