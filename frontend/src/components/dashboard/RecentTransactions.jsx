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
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm overflow-hidden mt-10">

            {/* Header */}
            <div className="p-5 sm:p-6 border-b border-gray-100">

                <div className="flex items-center justify-between">

                    <div>
                        <h2 className="text-lg sm:text-xl font-semibold text-gray-900">
                            Recent Transactions
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Your latest spending activity
                        </p>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                        <span className="text-lg">
                            🕐
                        </span>
                    </div>

                </div>

            </div>

            {recentExpenses.length === 0 ? (

                <div className="p-8 text-center">

                    <div className="text-4xl mb-3">
                        🧾
                    </div>

                    <p className="text-gray-500 text-sm">
                        No recent transactions.
                    </p>

                </div>

            ) : (

                <div className="divide-y divide-gray-100">

                    {recentExpenses.map((expense) => (

                        <div
                            key={expense.id}
                            className="p-4 sm:p-5 flex items-center justify-between gap-4 hover:bg-gray-50 transition-colors"
                        >

                            {/* Left */}
                            <div className="flex items-center gap-3 min-w-0">

                                <div className="w-10 h-10 shrink-0 rounded-xl bg-gray-100 flex items-center justify-center">
                                    <span className="text-lg">
                                        {expense.category === "Food"
                                            ? "🍔"
                                            : expense.category === "Travel"
                                                ? "✈️"
                                                : expense.category === "Shopping"
                                                    ? "🛍️"
                                                    : expense.category === "Bills"
                                                        ? "📄"
                                                        : expense.category === "Entertainment"
                                                            ? "🎬"
                                                            : "💳"}
                                    </span>
                                </div>

                                <div className="min-w-0">

                                    <p className="font-medium text-gray-900 truncate">
                                        {expense.title}
                                    </p>

                                    <div className="flex items-center gap-2 mt-1">

                                        <span
                                            className={`px-2 py-0.5 text-xs rounded-full font-medium ${getCategoryColor(expense.category)}`}
                                        >
                                            {expense.category}
                                        </span>

                                        <span className="text-xs text-gray-400">
                                            {new Date(expense.date).toLocaleDateString(
                                                "en-IN",
                                                {
                                                    day: "numeric",
                                                    month: "short",
                                                    year: "numeric",
                                                }
                                            )}
                                        </span>

                                    </div>

                                </div>

                            </div>

                            {/* Amount */}
                            <div className="shrink-0 text-right">

                                <p className="font-semibold text-gray-900">
                                    ₹{Number(expense.amount).toLocaleString("en-IN")}
                                </p>

                                <p className="text-xs text-gray-400 mt-1">
                                    Expense
                                </p>

                            </div>

                        </div>

                    ))}

                </div>

            )}

        </div>
    );
}

export default RecentTransactions;