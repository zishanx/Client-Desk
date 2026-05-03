const express = require('express');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const router = express.Router();


router.post('/register', async (req, res) => {
    try {

        const { name, email, password } = req.body;
        if (!name || !email || !password) {
            return res.status(400).send({ message: "All fields required." });
        }

        const existingUser = await User.findOne({ email })
        if (existingUser) {
            return res.status(400).json({ message: "Email already exists" });
        }

        const hashedpwd = await bcrypt.hash(password, 10)
        const user = new User({ name, email, password: hashedpwd });
        await user.save();
        res.status(201).json({message:"User regsitered", user});
    } catch (err) {
        res.json(err)
    }
})

router.post('/login', async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (user === null) { return res.status(404).json("User not found") }

        const hashedpwd = user.password;
        if (await bcrypt.compare(password, hashedpwd)) {
            const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
            res.json({ message: "Login Succesfully", token })
        } else {
            res.json("Invalid credential.")
        }
    } catch (err) {
        res.status(500).json({ message: "Server error" })
    }
})


module.exports = router;