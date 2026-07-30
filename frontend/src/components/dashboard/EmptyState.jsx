function EmptyState() {
    return (
        <div className="bg-white rounded-xl shadow p-8 text-center">

            <h2 className="text-2xl font-semibold">
                No Expenses Yet
            </h2>

            <p className="text-gray-500 mt-2">
                Add your first expense to get started.
            </p>

        </div>
    );
}

export default EmptyState;