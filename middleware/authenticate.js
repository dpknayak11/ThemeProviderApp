
const jwt = require("jsonwebtoken");
const User = require('../modal/userModal');
let secret = "ABC";

const generateToken = (user) => {
    return jwt.sign(
        {
            userId: user._id
        },
        secret,
        {
            expiresIn: "30d",
        }
    );
};


const isAuth = async (req, res, next) => {
    const authHeader = req.headers.authorization;

    try {
        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            return res.status(401).json({ error: "Unauthorized: No token provided" });
        }
        const token = authHeader.split(' ')[1];

        if (!token) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        const verifiedToken = jwt.verify(token, secret);
        if (!verifiedToken || !verifiedToken.userId) {
            return res.status(401).json({ error: "Unauthorized: Invalid token" });
        }

        const user = await User.findById(verifiedToken.userId);
        if (!user) {
            return res.status(401).json({ error: "Unauthorized: USER not found" });
        }

        req.user = user;
        next();
    } catch (error) {
        console.error("Authentication error:", error);
        return res.status(401).json({ error: "Unauthorized: Invalid token" });
    }
};


module.exports = { isAuth, generateToken };