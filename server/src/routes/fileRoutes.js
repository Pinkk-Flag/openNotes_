import express from "express";
import prisma from '../../prismaClient.js';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import multer from "multer";
import authMiddleware from "../middleware/authMiddleware.js";

const router = express.Router();

const downloadPenalty = 10;
const uploadReward = 30;

// Helper function to read files recursively
const readFilesRecursively = (dir, basepath = '') => {
    const results = [];
    const items = fs.readdirSync(dir);

    for (let item of items) {
        const itemPath = path.join(dir, item); // Full path
        let relativePath = path.join(basepath, item); // Relative path

        // Replace backslashes with forward slashes for consistency
        relativePath = relativePath.replace(/\\/g, '/');

        if (fs.statSync(itemPath).isDirectory()) {
            results.push({
                name: item,
                type: 'folder',
                path: "/" + relativePath,
            });
            results.push(...readFilesRecursively(itemPath, relativePath));
        } else {
            results.push({
                name: item,
                type: 'file',
                path: "/" + relativePath,
            });
        }
    }

    return results;
};

// File storage configuration
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, './public');
    },
    filename: function (req, file, cb) {
      const originalName = file.originalname;
      const timestamp = Date.now();
      const fileName = `${originalName}`;
      cb(null, fileName);
    },
});

const upload = multer({
     storage: storage,
     limits: {
        fileSize: 10 * 1024 * 1024, // 5MB max file size
     }
});

router.get('/api/filedata', (req, res) => {
    try {
        const fileData = readFilesRecursively("./public");
        res.json(fileData); // Send the file data as JSON response
    } catch (error) {
        console.error("Error reading files:", error);
        res.status(500).json({ error: "Failed to read files" });
    }
});

router.post('/upload', upload.single('file'), async (req, res) => {
    const userId = req.user.id; // Assuming user is authenticated and userId is available

    if (!req.file) {
        return res.status(400).send('No file uploaded');
    }

    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    await prisma.user.update({
        where: { id: userId },
        data: {
            tokens: user.tokens + uploadReward,
        },
    });

    res.status(200).send('File uploaded successfully');
});

router.get('/download/*', async (req, res) => {
    const filePath = decodeURIComponent(req.params[0]);
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const absolutePath = path.join(__dirname, "../../public", filePath);

    if (!fs.existsSync(absolutePath)) {
        return res.status(404).json({ message: "File not found" });
    }

    const userId = req.user.id; // Assuming user is authenticated and userId is available
    const user = await prisma.user.findUnique({
        where: { id: userId },
    });

    // Check if user has enough tokens (10 tokens for download)
    if (user.tokens < 10) {
        return res.status(400).send('Not enough tokens to download file');
    }

    // Deduct 10 tokens for downloading
    await prisma.user.update({
        where: { id: userId },
        data: {
            tokens: user.tokens - downloadPenalty,
        },
    });

    res.download(absolutePath, path.basename(filePath), (err) => {
        if (err) {
            console.error("Error downloading file:", err);
            res.status(500).send("Error downloading file");
        }
    });
});

router.get('/upload', (req, res) => {
    res.send("<p>Hello! This is the upload area of openNotes_</p>");
});

export default router;
