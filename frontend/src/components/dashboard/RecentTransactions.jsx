function RecentTransactions({ expenses }) {

    const recentExpenses = [...expenses]
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .slice(0, 5);

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
        <div className="bg-white shadow rounded-xl p-6 mt-8">
            <h2 className="text-xl font-semibold mb-4">
                Recent Transactions
            </h2>

            {recentExpenses.length === 0 ? (
                <p className="text-gray-500">
                    No recent transactions.
                </p>
            ) : (
                <table className="w-full">

                    <thead>
                        <tr className="border-b">
                            <th className="text-left py-2">Title</th>
                            <th className="text-left py-2">Category</th>
                            <th className="text-right py-2">Amount</th>
                            <th className="text-right py-2">Date</th>
                        </tr>
                    </thead>

                    <tbody>
                        {recentExpenses.map((expense) => (
                            <tr key={expense.id} className="border-b">

                                <td className="py-3">
                                    {expense.title}
                                </td>

                                <td>
                                    <span
                                        className={`px-3 py-1 rounded-full text-sm font-medium ${getCategoryColor(expense.category)}`}
                                    >
                                        {expense.category}
                                    </span>
                                </td>

                                <td className="text-right font-medium">
                                    <span className="font-semibold text-blue-600">
                                        ₹{Number(expense.amount).toLocaleString("en-IN")}
                                    </span>
                                </td>

                                <td className="text-right">
                                    {new Date(expense.date).toLocaleDateString("en-IN", {
                                        day: "numeric",
                                        month: "short",
                                        year: "numeric"
                                    })}
                                </td>

                            </tr>
                        ))}
                    </tbody>

                </table>
            )}
        </div>
    );
}

export default RecentTransactions;