import { CONNREFUSED } from "dns";
import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {

    const token = req.headers['authorization'] || req.headers['Authorization'];


    if (token === "") {
        console.log("No token provided (Provided '')");
        return res.status(401).json({ message: "Unauthorized (no token provided)" });
    }

    if (token === undefined) {
        console.log("No token provided (Provided 'undefined')");
        return res.status(401).json({ message: "Unauthorized (no token provided)" });
    }

    if (token === null) {
        console.log("No token provided (Provided 'null')");
        return res.status(401).json({ message: "Unauthorized (no token provided)" });
    }

    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Attach user data to the request
        next();
    } catch (err) {
        console.error("JWT verification failed:", err.message);
        res.status(401).json({ message: "Invalid token" });
    }
};

export default authMiddleware;