import express from "express";
import cors from "cors";
import healthRoutes from './routes/health.routes.js';

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

app.use('/health', healthRoutes);

export default app;