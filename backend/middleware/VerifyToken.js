const jwt = require("jsonwebtoken");
const dotenv = require("dotenv");
const User = require("../models/User");

dotenv.config({ path: 'config/config.env' });

const { JWT_SECRET } = process.env;

const verifyToken = async (req, res, next) => {
    try {
        const token = req.headers?.authorization?.split(" ")[1];
        if (!token) { return res.status(401).json({ message: "Invalid token format" }) }

        jwt.verify(token, JWT_SECRET, (err, decoded) => {
            if (err) { return res.status(403).json({ message: "Invalid or expired token" }) }
            req.user = decoded;
            next();
        });
    } catch (error) {
        return res.status(500).json({ message: "Error in token middleware" });
    }
};

module.exports = verifyToken;

const isAdmin = async (req, res, next) => {
    try {
        const user = await User.findById(req.user.userId);
        if (user.role !== 1) {
            return res.status(401).send({
                success: false,
                message: "UnAuthorized Access",
            });
        } else {
            next();
        }
    } catch (error) {
        console.log(error);
        res.status(401).send({
            success: false,
            error,
            message: "Error in admin middelware",
        });
    }
};

module.exports = {
    verifyToken,
    isAdmin,
};

