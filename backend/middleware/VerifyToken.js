const jwt = require("jsonwebtoken");
const dotenv = require('dotenv');
dotenv.config({ path: 'config.env' });

const { JWT_SECRET } = process.env;

const verifyToken = (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        if (!token) { return res.status(401).json({ message: "Invalid token format" }) }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) {return res.status(403).json({ message: "Invalid or expired token" })}
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: "Error in token middleware" });
    }
};

module.exports = verifyToken;
