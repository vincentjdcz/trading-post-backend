/**
 * @file authController.js
 * @module AuthController
 * @description This controller contains functions that handle Auth related requests.
 */
const bcrypt = require("bcrypt");
const User = require('../../models/user/model');
const jwt = require("jsonwebtoken");

/**
 * 
 * Creates a new User document.
 *
 * @async
 * @function signup
 * @route POST /signup
 * @group Auth - Operations related to authorization
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.userName - Desired userName of the user creating an account.
 * @param {string} req.body.firstName - First name of the user creating an account.
 * @param {string} req.body.lastName - Last name of the user creating an account.
 * @param {string} req.body.email - Email address of the user creating an account.
 * @param {string} req.body.password - Desired password of the user creating an account.
 * @param {Object} res - Express response object
 * @throws Returns a 400 status code if an account with the desired userName already exists.
 * @throws Returns a 400 status code if an account with the given email address already exists.
 * @throws Returns a 500 status code if an error occurs while creating the new User. 
 * @returns {Promise<void>} Returns a JSON response with a success or error message.
 * @example
 * // Example POST request to create a user with provided userName, firstName, lastName, email and password
 * // Endpoint: POST /signup
 * const devURL = `http://localhost:3000/api/auth/signup`;        
 * const response = await fetch(devURL,
 *   {
 *     method: "POST",
 *     headers: { "Content-Type": "application/json" },
 *     body: JSON.stringify({
 *       userName,
 *       firstName,
 *       lastName,
 *       email,
 *       password,
 *     }),
 *   }
 * );
*/
const signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        const checkUsername = await User.findOne({userName: req.body.userName})
        if (checkUsername) {
          return res.status(409).json({message: "Username already exists"});
        }
        const checkEmail = await User.findOne({email: req.body.email});
        if (checkEmail) {
          return res.status(409).json({message: "There is already an account associated with the provided email"})
        }
        const user = new User({ ...req.body, password: hashedPassword }); 
        await user.save(); 
        res.status(201).json({ message: "User registered successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

/**
 * 
 * Verifies user credentials and returns a JSON Web Token (JWT) upon successful authentication.
 *
 * @async
 * @function login
 * @route POST /login
 * @group Auth - Operations related to authorization
 * 
 * @param {Object} req - Express request object
 * @param {Object} req.body - Request body
 * @param {string} req.body.email - Provided email address of the user logging in.
 * @param {string} req.body.password - Provided password of the user logging in.
 * @param {Object} res - Express response object
 * @throws Returns a 400 status code if an invalid email and password combination is provided
 * @throws Returns a 500 status code if an error occurs during the login process
 * @returns {Promise<void>} Returns a JSON response with a success message, userId, userName, profilePicture and signed JWT token or an error message.
 * @example
 * // Example POST request to log in with provided email and password
 * // Endpoint: POST /login
 * const devURL = `http://localhost:3000/api/auth/login`;        
 * const response = await fetch(devURL, {
 *        method: "POST",
 *        headers: { "Content-Type": "application/json" },
 *        body: JSON.stringify({ email, password }),
 *      });
*/
const login = async (req, res) => {
    try {
        console.log("login attempt");
        const user = await User.findOne({ email: req.body.email });
        if (!user || !(await bcrypt.compare(req.body.password, user.password))) {
          return res.status(401).json({ message: "Invalid credentials" });
        }
        
        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "24h" });
        
        res.cookie('jwt', token, {
            httpOnly: true,  // Prevents client-side JavaScript from accessing the cookie
            maxAge: 24 * 60 * 60 * 1000  // 24 hours
        });
        console.log("login success");
        console.log("user", user.userName);
        res.json({ message: "Login successful", userId: user._id, userName: user.userName, profilePicture: user.profilePicture });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}

/**
 * 
 * Logs the user out by clearing the JWT cookie from the browser.
 *
 * @async
 * @function logout
 * @route POST /logout
 * @group Auth - Operations related to authorization
 * 
 * @param {Object} req - Express request object
 * @param {Object} res - Express response object
 * @throws Returns a 500 status code if an error occurs during the logout process
 * @returns {Promise<void>} Returns a JSON response with a logout success or error message
 * 
 * @example
 * // Example POST request to log out
 * // Endpoint: POST /logout
 * const devURL = `http://localhost:3000/api/auth/logout`;
 * const response = await fetch(devURL, {
 *        method: "POST",
 *        credentials: "include", // Important if you're using cookies
 *        headers: {
 *                  "Content-Type": "application/json",
 *        },
 * });
 */
const logout = async (req, res) => {
    try {
        res.clearCookie("jwt", {
            httpOnly: true,
        });
        res.status(200).json({ message: "Logout successful" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
}

module.exports = { signup, login, logout };