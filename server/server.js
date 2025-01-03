import express from "express";
import cors from "cors";
import path, {dirname} from "path";
import { fileURLToPath } from "url";
import authRoutes from "./src/routes/authRoutes.js";
import authMiddleware from "./src/routes/fileRoutes.js";
import fileRoutes from "./src/routes/fileRoutes.js";

const corsOptions = {
    origin: ["http://localhost:5173"]
}
const app = express();

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '../')));
app.use(express.json());
app.use(cors(corsOptions))

//==============================================================

app.use('/files', fileRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
