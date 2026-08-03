import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    CartesianGrid,
} from "recharts";

function MonthlyExpenseChart({ data }) {

    if (data.every((month) => month.total === 0)) {
        return (
            <div className="bg-white shadow rounded-xl p-6 mt-8">
                <h2 className="text-xl font-semibold mb-4">
                    Monthly Expenses
                </h2>

                <p className="text-gray-500">
                    No expense data available yet.
                </p>
            </div>
        );
    }

    return (
        <div className="bg-white shadow rounded-xl p-6 mt-8 ">
            <h2 className="text-xl font-semibold mb-6">
                Monthly Expenses
            </h2>

            <ResponsiveContainer width="100%" height={300}>
                <BarChart data={data}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="month" />

                    <YAxis
                        tickFormatter={(value) => `₹${value / 1000}k`}
                    />

                    <Tooltip
                        formatter={(value) => [`₹${Number(value).toLocaleString("en-IN")}`, "Expenses"]}
                    />

                    <Bar
                        dataKey="total"
                        radius={[8, 8, 0, 0]}
                        animationDuration={1000}
                    />
                </BarChart>
            </ResponsiveContainer>
        </div>
    );
}

export default MonthlyExpenseChart;