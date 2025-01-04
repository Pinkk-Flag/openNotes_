import express from "express";
import cors from "cors";
import path, {dirname} from "path";
import { fileURLToPath } from "url";
import authRoutes from "./src/routes/authRoutes.js";
import authMiddleware from "./src/middleware/authMiddleware.js";
import fileRoutes from "./src/routes/fileRoutes.js";


const corsOptions = {
    origin: ["http://localhost:5173"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Authorization", "Content-Type"]
}
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

app.use(express.static(path.join(__dirname, '../')));
app.use(cors(corsOptions))

//==============================================================

app.use('/files',authMiddleware, fileRoutes);
app.use('/auth', authRoutes);

app.get('/', (req, res) => {
    res.send(`<p> Server up and running! You are on port ${PORT} </p>`);
});



app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
