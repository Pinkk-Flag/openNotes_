import express from "express";
import prisma from '../../prismaClient.js';
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const router = express.Router();

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


// ENDPOINTS ===============================

router.get('/api/filedata', (req, res) => {
    try {
        const fileData = readFilesRecursively("./public");
        res.json(fileData); // Send the file data as JSON response
    } catch (error) {
        console.error("Error reading files:", error);
        res.status(500).json({ error: "Failed to read files" });
    }
});

router.get('/download/*', async (req, res) => {
    const filePath = decodeURIComponent(req.params[0]); // Get the full path after /download/
    const __filename = fileURLToPath(import.meta.url);
    const __dirname = path.dirname(__filename);
    const absolutePath = path.join(__dirname, "../../public", filePath);

    if (!fs.existsSync(absolutePath)) {
        return res.status(404).json({ message: "File not found" });
    }

    res.download(absolutePath, path.basename(filePath), (err) => {
        if (err) {
            console.error("Error downloading file:", err);
            res.status(500).send("Error downloading file");
        }
    });
});

router.delete('/download/*', (req,res) => {
    res.sendStatus(403);
});

export default router;