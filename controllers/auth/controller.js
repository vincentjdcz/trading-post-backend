const bcrypt = require("bcrypt");
const User = require('../../models/user/model');
const jwt = require("jsonwebtoken");

const signup = async (req, res) => {
    try {
        const hashedPassword = await bcrypt.hash(req.body.password, 10); 
        const user = new User({ ...req.body, password: hashedPassword }); 
        await user.save(); 
        res.status(201).json({ message: "User registered successfully" });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}


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
        res.json({ message: "Login successful", userId: user._id });
      } catch (err) {
        res.status(500).json({ error: err.message });
      }
}


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