import prisma from '../../prismaClient.js';
import express from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

const router = express.Router();

const defaultTokens = 100;

router.post("/register", async (req, res) => {
    const { username, password } = req.body;

    if (!username || !password) {
        return res.status(400).json({ message: "Username and password are required" });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    try {
        // Create a new user in the database
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

    try {
        const user = await prisma.user.findUnique({
            where: {
                username: username
            }
        });

        if (!user) {
            return res.status(404).send({ message: "User not found" });
        }

        // Compare the entered password with the hashed password
        const isPasswordValid = bcrypt.compareSync(password, user.password);
        if (!isPasswordValid) {
            return res.status(401).send({ message: "Invalid password" });
        }

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '168h' });

        res.json({ token });
    } catch (err) {
        console.log(err.message);
        res.sendStatus(503);
    }
});

router.get("/login", (req,res) => {
    res.send("<p> Login page... You shouldn't be here but okay <p>");
})
router.get("/register", (req,res) => {
    res.send("<p> Register page... You shouldn't be here but okay <p>");
})

export default router;