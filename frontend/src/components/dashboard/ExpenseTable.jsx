function ExpenseTable({ expenses, onDelete, onEdit, deletingId }) {
    return (
        <div className="bg-white shadow rounded-xl mt-6 p-6">

            <h2 className="text-xl font-semibold mb-4">
                Expense Table
            </h2>

            <div className="overflow-x-auto">

                <table className="min-w-full">

                    <thead>
                        <tr className="bg-gray-100">
                            <th className="px-4 py-3 whitespace-nowrap">Title</th>
                            <th className="px-4 py-3 whitespace-nowrap">Amount</th>
                            <th className="px-4 py-3 whitespace-nowrap">Category</th>
                            <th className="px-4 py-3 whitespace-nowrap">Date</th>
                            <th className="px-4 py-3 whitespace-nowrap">Notes</th>
                            <th className="px-4 py-3 whitespace-nowrap">Actions</th>
                        </tr>
                    </thead>

                    <tbody>
                        {expenses.map((expense) => (
                            <tr key={expense.id}>
                                <td className="px-4 py-3 whitespace-nowrap">{expense.title}</td>
                                <td className="px-4 py-3 whitespace-nowrap">₹{expense.amount}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{expense.category}</td>
                                <td className="px-4 py-3 whitespace-nowrap">{expense.date}</td>
                                <td className="px-4 py-3 whitespace-nowrap">
                                    {expense.notes || "-"}
                                </td>
                                <td className="px-4 py-3 ">
                                    <div className="flex gap-2">
                                        <button
                                            onClick={() => onEdit(expense)}
                                            disabled={deletingId === expense.id}
                                            className="bg-yellow-500 text-white rounded px-3 py-1 hover:bg-yellow-600 disabled:opacity-50"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => onDelete(expense.id)}
                                            disabled={deletingId === expense.id}
                                            className="bg-red-500 text-white rounded px-3 py-1 hover:bg-red-600 disabled:opacity-50"
                                        >
                                            {deletingId === expense.id ? "Deleting..." : "Delete"}
                                        </button>
                                    </div>
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