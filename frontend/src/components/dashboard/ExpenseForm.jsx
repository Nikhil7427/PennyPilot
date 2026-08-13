import { useForm } from "react-hook-form";
import { addExpense, updateExpense } from "../../services/expense.services";
import { useState, useEffect } from "react";

import { toast } from 'react-toastify';

function ExpenseForm({ onExpenseAdded, editingExpense, setEditingExpense }) {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset,
    } = useForm();

    useEffect(() => {
        if (editingExpense) {
            reset({
                title: editingExpense.title,
                amount: editingExpense.amount,
                category: editingExpense.category,
                date: editingExpense.date,
                notes: editingExpense.notes || "",
            });
        } else {
            reset({
                title: "",
                amount: "",
                category: "",
                date: "",
                notes: "",
            });
        }
    }, [editingExpense, reset]);

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);

            data.amount = Number(data.amount);

            if (editingExpense) {
                await updateExpense(editingExpense.id, data);
                toast.success("Expense updated successfully!");
            } else {
                await addExpense(data);
                toast.success("Expense added successfully!");
            }

            reset();

            setEditingExpense(null);

            onExpenseAdded();

        } catch (error) {
            console.error(error);
            toast.error("Something went wrong!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white shadow rounded-xl p-4 md:p-6 w-full">

            <h2 className="text-xl sm:text-2xl font-bold mb-6">
                {editingExpense ? "Edit Expense" : "Add Expense"}
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >

                <input
                    type="text"
                    placeholder="Title"
                    {...register("title")}
                    className="w-full border rounded-lg px-4 py-3"
                />

                <input
                    type="number"
                    placeholder="Amount"
                    {...register("amount")}
                    className="w-full border rounded-lg px-4 py-3"
                />

                <select
                    {...register("category")}
                    className="w-full border rounded-lg px-4 py-3"
                >
                    <option value="">Select Category</option>
                    <option value="Food">Food</option>
                    <option value="Travel">Travel</option>
                    <option value="Shopping">Shopping</option>
                    <option value="Bills">Bills</option>
                    <option value="Entertainment">Entertainment</option>
                    <option value="Other">Other</option>
                </select>

                <input
                    type="date"
                    {...register("date")}
                    className="w-full border rounded-lg px-4 py-3"
                />

                <textarea
                    placeholder="Notes"
                    {...register("notes")}
                    rows={4}
                    className="w-full border rounded-lg px-4 py-3 resize-none"
                />
                <div className="flex flex-col sm:flex-row gap-3 mt-4">
                    <button
                        type="submit"
                        disabled={isSubmitting}
                        className="w-full sm:w-auto bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                    >
                        {isSubmitting
                            ? (editingExpense ? "Updating..." : "Adding...")
                            : (editingExpense ? "Update Expense" : "Add Expense")}
                    </button>

                    {editingExpense && (
                        <button
                            type="button"
                            onClick={() => {
                                reset();
                                setEditingExpense(null);
                            }}
                            className="w-full sm:w-auto bg-gray-500 text-white px-6 py-3 rounded-lg hover:bg-gray-600"
                        >
                            Cancel
                        </button>
                    )}
                </div>

            </form>

        </div>
    );
}

export default ExpenseForm;