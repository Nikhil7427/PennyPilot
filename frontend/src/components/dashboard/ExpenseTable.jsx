function ExpenseTable({ expenses, onDelete }) {
    return (
        <div className="bg-white shadow rounded-xl mt-6 p-6">

            <h2 className="text-xl font-semibold mb-4">
                Expense Table
            </h2>

            <div className="overflow-x-auto">

                <table className="w-full border-collapse">

                    <thead>
                        <tr className="bg-gray-100">
                            <th className="border p-3 text-left">Title</th>
                            <th className="border p-3 text-left">Amount</th>
                            <th className="border p-3 text-left">Category</th>
                            <th className="border p-3 text-left">Date</th>
                            <th className="border p-3 text-left">Notes</th>
                            <th className="border p-3 text-center">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td className="border p-3">{expense.title}</td>
                                <td className="border p-3">₹{expense.amount}</td>
                                <td className="border p-3">{expense.category}</td>
                                <td className="border p-3">{expense.date}</td>
                                <td className="border p-3">
                                    {expense.notes || "-"}
                                </td>
                                <td className="border p-3 text-center">
                                    <button
                                        onClick={() => onDelete(expense.id)}
                                        className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600"
                                    >
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        ))}
                    </tbody>

                </table>

            </div>

        </div>
    );
}

export default ExpenseTable;