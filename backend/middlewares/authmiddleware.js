const jwt = require('jsonwebtoken')

const protect = async (req, res, next) => {

    const token = req.header.authorization;
    if (!token) {
        return res.status(400).send("No token found");
    }
    try {

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next()
    } catch (err) {
        res.status(400).json("Invalid token")
    }
}

module.exports = protectl