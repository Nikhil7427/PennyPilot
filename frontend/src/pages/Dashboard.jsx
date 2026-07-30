import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import SummaryCard from "../components/dashboard/SummaryCard";
import ExpenseForm from "../components/dashboard/ExpenseForm";
import ExpenseTable from "../components/dashboard/ExpenseTable";

function Dashboard() {
    return (
        <div className="bg-slate-100 min-h-screen">

            <Navbar />

            <div className="flex">

                <Sidebar />

                <main className="flex-1 p-8">

                    <h1 className="text-4xl font-bold mb-8">
                        Welcome Back 👋
                    </h1>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

                        <SummaryCard
                            title="Total Expenses"
                            value="₹0"
                        />

                        <SummaryCard
                            title="This Month"
                            value="₹0"
                        />

                        <SummaryCard
                            title="Categories"
                            value="0"
                        />

                    </div>

                    <div className="mt-8">
                        <ExpenseForm />
                    </div>

                    <ExpenseTable />

                </main>

            </div>

        </div>
    );
}

export default Dashboard;