import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import SummaryCard from "../components/dashboard/SummaryCard";
import ExpenseForm from "../components/dashboard/ExpenseForm";
import ExpenseTable from "../components/dashboard/ExpenseTable";
import EmptyState from "../components/dashboard/EmptyState";
import { deleteExpense } from "../services/expense.services";
import ExpensePieChart from "../components/dashboard/ExpensePieChart";

import { useEffect, useState } from 'react';
import { getExpenses } from '../services/expense.services'

function Dashboard() {

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const fetchExpenses = async () => {
        try {
            const response = await getExpenses();

            setExpenses(response.expenses || []);
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchExpenses();
    }, []);

    const handleDelete = async (id) => {
        try {
            await deleteExpense(id);

            fetchExpenses();

        } catch (error) {
            console.error(error);
            alert("Filed to delete Expense");
        }
    }

    const totalExpenses = expenses.reduce(
        (total, expense) => total + Number(expense.amount),
        0
    );

    const totalTransactions = expenses.length;

    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const thisMonthExpenses = expenses
        .filter((expense) => {
            const expenseDate = new Date(expense.date);

            return (
                expenseDate.getMonth() === currentMonth &&
                expenseDate.getFullYear() === currentYear
            );
        })
        .reduce((total, expense) => total + Number(expense.amount), 0);

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
                            value={`₹${totalExpenses}`}
                        />

                        <SummaryCard
                            title="Transactions"
                            value={totalTransactions}
                        />

                        <SummaryCard
                            title="This Month"
                            value={`₹${thisMonthExpenses}`}
                        />

                    </div>

                    <div className="mt-8">
                        <ExpenseForm onExpenseAdded={fetchExpenses} />
                    </div>

                    <div className="mt-8">
                        {loading ? (
                            <p>Loading...</p>
                        ) : expenses.length === 0 ? (
                            <EmptyState />
                        ) : (
                            <>
                                <ExpenseTable
                                    expenses={expenses}
                                    onDelete={handleDelete}
                                />
                                <ExpensePieChart expenses={expenses} />
                            </>
                        )}
                    </div>

                </main>

            </div>

        </div>
    );
}

export default Dashboard;