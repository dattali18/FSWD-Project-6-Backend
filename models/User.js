/**
 * @desc User model - will contain all the user related functions
 */

const connection = require('../database/MySQL/connection');
const bcrypt = require('bcrypt');

/**
 * @desc User - class that will represent the user object
 * @property id : number
 * @property username : string
 * @property email : string
 * @property password : string
 */
class User {
    /**
     * @desc constructor for the user
     * @param id : number
     * @param username : string
     * @param email : string
     * @param password : string
     */
    constructor(id, username, email, password) {
        this.id = id;
        this.username = username;
        this.email = email;
        this.password = password;
    }
}

/**
 * @desc This function will get all the users from the database
 * @returns {Promise<*[]>}
 */
async function getAllUsers() {
    try {
        const [rows] = await connection.execute('SELECT * FROM Users');
        return rows;
    } catch (error) {
        console.error('Error in getting all users', error);
        return [];
    }
}

/**
 * @desc This function will add a user to the database
 * @param user : User - the user to add to the database
 * @returns {Promise<*>}
 */
async function createUser(user) {
    try {
        // before inserting the password we will encrypt it
        user.password = await bcrypt.hash(user.password, 10);
        const [rows] = await connection.execute('INSERT INTO Users (username, email, password) VALUES (?, ?, ?)', [user.username, user.email, user.password]);
        return rows;
    } catch (error) {
        console.error('Error in creating user', error);
        return [];
    }
}

/**
 * @desc This function will delete a user from the database
 * @param user_id
 * @returns {Promise<*|*[]>}
 */
async function deleteUser(user_id) {
    try {
        const [rows] = await connection.execute('DELETE FROM Users WHERE id = ?', [user_id]);
        return rows;
    } catch (error) {
        console.error('Error in deleting user', error);
        return [];
    }
}

module.exports = {
    User,
    getAllUsers,
    createUser,
    deleteUser
}
