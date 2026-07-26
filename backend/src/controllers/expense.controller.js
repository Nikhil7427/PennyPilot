import { defineConfig } from 'drizzle-kit';
import { db } from '../db/index.js'
import { expenses } from '../db/schema.js';
import { eq, and } from 'drizzle-orm';
import e from 'express';

export const createExpense = async (req, res) => {
    try {
        const { title, amount, category, date, notes } = req.body;

        if(!title || !amount || !category || !date){
            return res.status(400).json({
                success: false,
                message: "Title, amount, category and date are required",
            });
        }

        const userId = req.user.id;
        const newExpense = await db
            .insert(expenses)
            .values({
                userId,
                title,
                amount,
                category,
                date,
                notes,
            }).returning();

        res.status(201).json({
            success: true,
            message: "Expense created successfully",
            expense: newExpense[0],
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

export const getExpenses = async (req, res) => {
    try {
        const userId = req.user.id;

        const userExpense = await db
            .select()
            .from(expenses)
            .where(eq(expenses.userId, userId));

        res.status(200).json({
            success: true,
            count: userExpense.length,
            expenses: userExpense,
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const updateExpense = async (req, res) => {
    try {
        const expenseId = Number(req.params.id);
        const userId = req.user.id;

        const { title, amount, category, date, notes } = req.body;
        
        const existingExpense = await db.query.expenses.findFirst({
            where: and(
                eq(expenses.id, expenseId),
                eq(expenses.userId, userId)
            ),
        });

        if(!existingExpense){
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        const updatedExpense = await db
            .update(expenses)
            .set({
                title,
                amount,
                category,
                date,
                notes,
            })
            .where(eq( expenses.id ,expenseId ))
            .returning();

        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            expense: updatedExpense[0],
        });
    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};

export const deleteExpense = async(req, res) => {
    try {
        const expenseId = Number(req.params.id);
        const userId = req.user.id;

        const existingExpense = await db.query.expenses.findFirst({
            where: and(
                eq(expenses.id, expenseId),
                eq(expenses.userId, userId)
            ),
        });

        if(!existingExpense){
            return res.status(404).json({
                success: false,
                message: "Expense not found",
            });
        }

        await db   
            .delete(expenses)
            .where(eq(expenses.id, expenseId));

        res.status(200).json({
            success: true,
            message: "Expense deleted successfully",
        });

    } catch (error) {
        console.error(error);

        res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
}