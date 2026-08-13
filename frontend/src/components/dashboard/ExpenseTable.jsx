function ExpenseTable({ expenses, onDelete, onEdit, deletingId }) {

    const getCategoryColor = (category) => {
        switch (category) {
            case "Food":
                return "bg-green-100 text-green-700";
            case "Travel":
                return "bg-blue-100 text-blue-700";
            case "Shopping":
                return "bg-purple-100 text-purple-700";
            case "Bills":
                return "bg-red-100 text-red-700";
            case "Entertainment":
                return "bg-pink-100 text-pink-700";
            default:
                return "bg-gray-100 text-gray-700";
        }
    };

    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden">

            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-gray-100">
                <div className="flex items-center justify-between gap-4">

                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                            Expense Table
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Manage your expenses and transactions
                        </p>
                    </div>

                    <div className="hidden sm:flex items-center justify-center w-10 h-10 rounded-xl bg-blue-50">
                        <span className="text-lg">
                            🧾
                        </span>
                    </div>

                </div>
            </div>

            {/* Table */}
            <div className="overflow-x-auto">

                <table className="w-full text-sm">

                    <thead>
                        <tr className="bg-gray-50 border-b border-gray-100">

                            <th className="px-5 py-4 text-left font-medium text-gray-500 whitespace-nowrap">
                                Title
                            </th>

                            <th className="px-5 py-4 text-left font-medium text-gray-500 whitespace-nowrap">
                                Amount
                            </th>

                            <th className="px-5 py-4 text-left font-medium text-gray-500 whitespace-nowrap">
                                Category
                            </th>

                            <th className="px-5 py-4 text-left font-medium text-gray-500 whitespace-nowrap">
                                Date
                            </th>

                            <th className="px-5 py-4 text-left font-medium text-gray-500 whitespace-nowrap">
                                Notes
                            </th>

                            <th className="px-5 py-4 text-left font-medium text-gray-500 whitespace-nowrap">
                                Actions
                            </th>

                        </tr>
                    </thead>

                    <tbody className="divide-y divide-gray-100">

                        {expenses.map((expense) => (

                            <tr
                                key={expense.id}
                                className="hover:bg-gray-50 transition-colors"
                            >

                                <td className="px-5 py-4 font-medium text-gray-900 whitespace-nowrap">
                                    {expense.title}
                                </td>

                                <td className="px-5 py-4 font-semibold text-blue-600 whitespace-nowrap">
                                    ₹{Number(expense.amount).toLocaleString("en-IN")}
                                </td>

                                <td className="px-5 py-4 whitespace-nowrap">
                                    <span
                                        className={`inline-flex px-2.5 py-1 text-xs font-medium rounded-full ${getCategoryColor(expense.category)}`}
                                    >
                                        {expense.category}
                                    </span>
                                </td>

                                <td className="px-5 py-4 text-gray-600 whitespace-nowrap">
                                    {new Date(expense.date).toLocaleDateString(
                                        "en-IN",
                                        {
                                            day: "numeric",
                                            month: "short",
                                            year: "numeric",
                                        }
                                    )}
                                </td>

                                <td className="px-5 py-4 text-gray-500 max-w-[200px]">
                                    <span
                                        className="block truncate"
                                        title={expense.notes || ""}
                                    >
                                        {expense.notes || "-"}
                                    </span>
                                </td>

                                <td className="px-5 py-4 whitespace-nowrap">

                                    <div className="flex items-center gap-2">

                                        <button
                                            onClick={() => onEdit(expense)}
                                            disabled={deletingId === expense.id}
                                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-amber-50 text-amber-700 hover:bg-amber-100 disabled:opacity-50 transition-colors"
                                        >
                                            Edit
                                        </button>

                                        <button
                                            onClick={() => onDelete(expense.id)}
                                            disabled={deletingId === expense.id}
                                            className="px-3 py-1.5 text-xs font-medium rounded-lg bg-red-50 text-red-600 hover:bg-red-100 disabled:opacity-50 transition-colors"
                                        >
                                            {deletingId === expense.id
                                                ? "Deleting..."
                                                : "Delete"}
                                        </button>

                                    </div>

                                </td>

                            </tr>

                        ))}

                    </tbody>

                </table>

            </div>

            {/* Mobile hint */}
            <div className="sm:hidden px-5 py-3 bg-gray-50 border-t border-gray-100">
                <p className="text-xs text-gray-400 text-center">
                    Swipe horizontally to view all columns
                </p>
            </div>

        </div>
    );
}

export default ExpenseTable;