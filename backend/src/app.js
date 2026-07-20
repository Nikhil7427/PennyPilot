import express from "express";
import cors from "cors";

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// test route
app.get('/', (req, res) => {
    res.status(200).json({
        success: true,
        message: "Welcome to PennyPilot API",
    });
});

export default app;