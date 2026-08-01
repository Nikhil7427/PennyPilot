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

    return (
        <div className="bg-white shadow rounded-xl p-6 mt-6">
            <h2 className="text-xl font-semibold mb-4">
                Expenses by Category
            </h2>

            <ResponsiveContainer width="100%" height={300}>

                <PieChart>

                    <Pie
                        data={chartData}
                        dataKey="value"
                        nameKey="name"
                        outerRadius={100}
                        label
                    >
                        {chartData.map((entry, index) => (
                            <Cell
                                key={entry.name}
                                fill={COLORS[index % COLORS.length]}
                            />
                        ))}
                    </Pie>

                    <Tooltip />
                    <Legend />

                </PieChart>
                
            </ResponsiveContainer>
        </div>
    );
}

export default ExpensePieChart;