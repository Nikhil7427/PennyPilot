import express from 'express';
import { createExpense } from "../controllers/expense.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post('/', verifyToken, createExpense);

export default router;
