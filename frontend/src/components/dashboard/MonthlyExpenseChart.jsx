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

    const hasData = data.some(
        (month) => month.total > 0
    );

    const yearlyTotal = data.reduce(
        (sum, month) => sum + Number(month.total),
        0
    );

    if (!hasData) {
        return (
            <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm">

                <div className="flex items-start justify-between">

                    <div>
                        <h2 className="text-lg font-semibold text-gray-900">
                            Monthly Spending
                        </h2>

                        <p className="text-sm text-gray-500 mt-1">
                            Track your spending over time
                        </p>
                    </div>

                    <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                        <span className="text-lg">
                            📈
                        </span>
                    </div>

                </div>

                <div className="h-[300px] flex items-center justify-center">

                    <div className="text-center">

                        <div className="text-4xl mb-3">
                            📊
                        </div>

                        <p className="text-gray-500 text-sm">
                            No expense data available yet.
                        </p>

                        <p className="text-gray-400 text-xs mt-1">
                            Add an expense to see your analytics.
                        </p>

                    </div>

                </div>

            </div>
        );
    }

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">

            {/* Header */}
            <div className="flex items-start justify-between">

                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Monthly Spending
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        Your spending throughout the year
                    </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-indigo-50 flex items-center justify-center">
                    <span className="text-lg">
                        📈
                    </span>
                </div>

            </div>

            {/* Total */}
            <div className="mt-5 mb-2">

                <p className="text-xs text-gray-400">
                    Yearly spending
                </p>

                <p className="text-xl font-bold text-gray-900">
                    ₹{yearlyTotal.toLocaleString("en-IN")}
                </p>

            </div>

            {/* Chart */}
            <div className="w-full h-[300px] sm:h-[320px]">

                <ResponsiveContainer width="100%" height="100%">

                    <BarChart
                        data={data}
                        margin={{
                            top: 10,
                            right: 5,
                            left: -15,
                            bottom: 5,
                        }}
                    >

                        <CartesianGrid
                            strokeDasharray="3 3"
                            vertical={false}
                            stroke="#E5E7EB"
                        />

                        <XAxis
                            dataKey="month"
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: 11,
                                fill: "#6B7280",
                            }}
                        />

                        <YAxis
                            axisLine={false}
                            tickLine={false}
                            tick={{
                                fontSize: 11,
                                fill: "#6B7280",
                            }}
                            tickFormatter={(value) =>
                                value >= 1000
                                    ? `₹${(value / 1000).toFixed(0)}k`
                                    : `₹${value}`
                            }
                        />

                        <Tooltip
                            formatter={(value) => [
                                `₹${Number(value).toLocaleString("en-IN")}`,
                                "Expenses",
                            ]}
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #e5e7eb",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            }}
                            cursor={{
                                fill: "#F3F4F6",
                            }}
                        />

                        <Bar
                            dataKey="total"
                            fill="#4F46E5"
                            radius={[6, 6, 0, 0]}
                            barSize={28}
                            animationDuration={1000}
                        />

                    </BarChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default MonthlyExpenseChart;