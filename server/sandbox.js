import fs from "fs";
import path from "path";

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
                path: relativePath,
            });
            results.push(...readFilesRecursively(itemPath, relativePath));
        } else {
            results.push({
                name: item,
                type: 'file',
                path: relativePath,
            });
        }
    }

    return results;
};

const files = readFilesRecursively("./");
console.log(files);
