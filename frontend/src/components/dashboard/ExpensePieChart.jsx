import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from "recharts";

const COLORS = [
    "#3B82F6",
    "#10B981",
    "#F59E0B",
    "#EF4444",
    "#8B5CF6",
    "#06B6D4",
];

function ExpensePieChart({ expenses }) {

    const categoryTotals = expenses.reduce((acc, expense) => {
        const category = expense.category;

        if (!acc[category]) {
            acc[category] = 0;
        }

        acc[category] += Number(expense.amount);

        return acc;
    }, {});

    const chartData = Object.entries(categoryTotals).map(
        ([category, amount]) => ({
            name: category,
            value: amount,
        })
    );

    const total = chartData.reduce(
        (sum, item) => sum + item.value,
        0
    );

    return (
        <div className="bg-white border border-gray-100 rounded-2xl p-5 sm:p-6 shadow-sm hover:shadow-md transition-shadow duration-200">

            {/* Header */}
            <div className="flex items-start justify-between mb-2">

                <div>
                    <h2 className="text-lg font-semibold text-gray-900">
                        Spending by Category
                    </h2>

                    <p className="text-sm text-gray-500 mt-1">
                        See where your money is going
                    </p>
                </div>

                <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
                    <span className="text-lg">
                        📊
                    </span>
                </div>

            </div>

            {/* Total */}
            <div className="mt-5 mb-2">
                <p className="text-xs text-gray-400">
                    Total spending
                </p>

                <p className="text-xl font-bold text-gray-900">
                    ₹{total.toLocaleString("en-IN")}
                </p>
            </div>

            {/* Chart */}
            <div className="w-full h-[300px] sm:h-[320px]">

                <ResponsiveContainer width="100%" height="100%">

                    <PieChart>

                        <Pie
                            data={chartData}
                            dataKey="value"
                            nameKey="name"
                            cx="50%"
                            cy="45%"
                            innerRadius={65}
                            outerRadius={100}
                            paddingAngle={3}
                            stroke="none"
                        >
                            {chartData.map((entry, index) => (
                                <Cell
                                    key={entry.name}
                                    fill={COLORS[index % COLORS.length]}
                                />
                            ))}
                        </Pie>

                        <Tooltip
                            formatter={(value) =>
                                `₹${Number(value).toLocaleString("en-IN")}`
                            }
                            contentStyle={{
                                borderRadius: "12px",
                                border: "1px solid #e5e7eb",
                                boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                            }}
                        />

                        <Legend
                            verticalAlign="bottom"
                            height={45}
                            iconType="circle"
                            wrapperStyle={{
                                fontSize: "12px",
                            }}
                        />

                    </PieChart>

                </ResponsiveContainer>

            </div>

        </div>
    );
}

export default ExpensePieChart;