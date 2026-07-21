import express from 'express';
import { db } from '../db/index.js';
import { sql } from 'drizzle-orm';

const router = express.Router();

router.get('/', async(req, res) => {
    try {
        await db.execute(sql`SELECT 1`);

        res.status(200).json({
            success: true,
            message: "Database connected successfully ✅",
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Database connection failed ❌",
        });
    }
});

export default router;