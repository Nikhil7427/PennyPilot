import express from 'express';
import { createExpense, getExpenses, updateExpense, deleteExpense } from "../controllers/expense.controller.js";
import { verifyToken } from "../middleware/auth.middleware.js";


const router = express.Router();

router.post('/', verifyToken, createExpense);
router.get('/', verifyToken, getExpenses);
router.put('/:id', verifyToken, updateExpense);
router.delete("/:id", verifyToken, deleteExpense);

export default router;
