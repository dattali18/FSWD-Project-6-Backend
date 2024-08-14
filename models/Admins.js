/**
 * @desc Admins model is used to store the information of the admin users.
 */

const connection = require('../database/MySQL/connection');

/**
 * @desc Admin class is used to store the information of the admin users.
 * @property {number} user_id - The user_id of the admin user.
 */
class Admin {
    /**
     * @desc Constructor for the Admin class.
     * @param {number} user_id
     */
    constructor(user_id) {
        this.user_id = user_id;
    }
}

/**
 * @desc This function is used to check if the user is an admin.
 * @param {number} user_id - The user_id of the user.
 */
async function isUserAdmin(user_id) {
    const [result] = await connection.execute('SELECT * FROM Admins WHERE user_id = ?', [user_id]);
    return result.length > 0;
}

/**
 * @desc This function is used to give a user admin rights.
 * @param {number} user_id - The user_id of the user.
 */
async function giveAdminRights(user_id) {
    await connection.execute('INSERT INTO Admins (user_id) VALUES (?)', [user_id]);
}

/**
 * @desc This function is used to remove the admin rights of a user.
 * @param user_id
 * @returns {Promise<void>}
 */
async function removeAdminRights(user_id) {
    await connection.execute('DELETE FROM Admins WHERE user_id = ?', [user_id]);
}

module.exports = {
    Admin,
    isUserAdmin,
    giveAdminRights,
    removeAdminRights
}