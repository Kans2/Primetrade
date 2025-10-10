import dotenv from "dotenv";
import jwt from "jsonwebtoken";

dotenv.config();
function verifyToken(req, res, next) {
    try {
        const token = req.headers["authorization"];
        if (!token || !token.startsWith("Bearer ")) {
            return res.status(401).json({ message: "Access Denied: No Token Provided" });
        }
        const jwtToken = token.split(" ")[1];

        jwt.verify(jwtToken, process.env.JWT_SECRET, (err, decoded) => {
            if (err) {
                return res.status(401).json({ message: "Access Denied" });
            }
            req.user = decoded.user;
            next();
        });
    } catch (err) {
        return res.status(500).json({ message: "Internal Server Error" });
    }
}

export {verifyToken}