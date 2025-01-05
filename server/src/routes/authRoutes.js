import prisma from '../../prismaClient.js';
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const defaultTokens = 100;

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        // Check if username already exists
        const existingUser = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (existingUser) {
            return res.status(409).json({ message: "Username already exists" });
        }

        // Create a new user if username doesn't exist
        const user = await prisma.user.create({
            data: {
                username: username,
                password: hashedPassword,
                tokens: defaultTokens,
            },
        });

        // Generate a token
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '168h' });

        res.json({ token });
    } catch (err) {
        console.error(err.message);
        res.status(503).json({ message: "Error creating user" });
    }
});

router.post("/login", async (req, res) => {
    const { username, password } = req.body;
    if (!username || !password) {
        return res.status(400).send({ message: "Username and password are required" });
    }
    
    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });
    
        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }
    
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid password" });
        }
    
        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '168h' });
        console.log("Token generated for user:", username);
        res.status(200).send({ token });
    } catch (error) {
        console.error("Internal server error:", error);
        res.status(500).send({ message: "Internal server error" });
    }
});

router.get('/tokens', authMiddleware, async (req, res) => {
    try {
        const userId = req.user.id; // Extract user ID from the JWT
        const user = await prisma.user.findUnique({
            where: { id: userId },
            select: { tokens: true }, // Only fetch the token count
        });

        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        res.json({ tokens: user.tokens });
    } catch (error) {
        console.error("Error fetching tokens:", error);
        res.status(500).json({ message: "Internal server error" });
    }
});

router.get("/login", (req, res) => {
    res.send("<p> Login page... You shouldn't be here but okay <p>");
});

router.get("/register", (req, res) => {
    res.send("<p> Register page... You shouldn't be here but okay <p>");
});

export default router;