function EmptyState() {
    return (
        <div className="bg-white border border-gray-100 rounded-2xl shadow-sm p-8 sm:p-12 text-center">

            <div className="w-16 h-16 mx-auto rounded-2xl bg-blue-50 flex items-center justify-center text-3xl">
                💸
            </div>

            <h2 className="text-xl sm:text-2xl font-semibold text-gray-900 mt-5">
                No Expenses Yet
            </h2>

            <p className="text-gray-500 mt-2 max-w-sm mx-auto">
                Add your first expense to start tracking your spending
                and see your financial insights.
            </p>

        </div>
    );
}

export default EmptyState;