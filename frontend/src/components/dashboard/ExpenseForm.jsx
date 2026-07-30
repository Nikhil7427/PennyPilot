import { useForm } from "react-hook-form";
import { addExpense } from "../../services/expense.services";
import { useState } from "react";

function ExpenseForm({ onExpenseAdded }) {

    const [isSubmitting, setIsSubmitting] = useState(false);

    const {
        register,
        handleSubmit,
        reset,
    } = useForm();

    const onSubmit = async (data) => {
        try {
            setIsSubmitting(true);

            data.amount = Number(data.amount);

            await addExpense(data);

            reset();

            onExpenseAdded();

        } catch (error) {
            console.error(error);
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div className="bg-white shadow rounded-xl p-6">

            <h2 className="text-2xl font-bold mb-6">
                Add Expense
            </h2>

            <form
                onSubmit={handleSubmit(onSubmit)}
                className="space-y-4"
            >

                <input
                    type="text"
                    placeholder="Title"
                    {...register("title")}
                    className="w-full border rounded-lg p-3"
                />

                <input
                    type="number"
                    placeholder="Amount"
                    {...register("amount")}
                    className="w-full border rounded-lg p-3"
                />

                <select
                    {...register("category")}
                    className="w-full border rounded-lg p-3"
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
                    className="w-full border rounded-lg p-3"
                />

                <textarea
                    placeholder="Notes"
                    {...register("notes")}
                    className="w-full border rounded-lg p-3"
                />

                <button
                    type="submit"
                    disabled={isSubmitting}
                    className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700"
                >
                    {isSubmitting ? "Adding..." : "Add Expense"}
                </button>

            </form>

        </div>
    );
}

export default ExpenseForm;