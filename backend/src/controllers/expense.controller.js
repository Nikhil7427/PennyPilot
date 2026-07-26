import { db } from '../db/index.js'
import { expenses } from '../db/schema.js';

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
}