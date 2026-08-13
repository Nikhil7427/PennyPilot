import Navbar from "../components/layout/Navbar";
import Sidebar from "../components/layout/Sidebar";
import SummaryCard from "../components/dashboard/SummaryCard";
import ExpenseForm from "../components/dashboard/ExpenseForm";
import ExpenseTable from "../components/dashboard/ExpenseTable";
import EmptyState from "../components/dashboard/EmptyState";
import { deleteExpense } from "../services/expense.services";
import ExpensePieChart from "../components/dashboard/ExpensePieChart";
import RecentTransactions from "../components/dashboard/RecentTransactions";
import MonthlyExpenseChart from "../components/dashboard/MonthlyExpenseChart";

import { useEffect, useState } from 'react';
import { getExpenses } from '../services/expense.services'

import { toast } from "react-toastify";

function Dashboard() {

    const [editingExpense, setEditingExpense] = useState(null);

    const [expenses, setExpenses] = useState([]);
    const [loading, setLoading] = useState(true);

    const [deletingId, setDeletingId] = useState(null);

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
            setDeletingId(id);
            await deleteExpense(id);

            toast.success("Expense deleted successfully!");

            fetchExpenses();

        } catch (error) {
            console.error(error);
            toast.error("Failed to delete expense.");
        } finally {
            setDeletingId(null);
        }
    };

    const handleEdit = (expense) => {
        setEditingExpense(expense);
    };

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

    const today = new Date();

    const todaysExpenses = expenses
        .filter((expense) => {
            const expenseDate = new Date(expense.date);

            return (
                expenseDate.getDate() === today.getDate() &&
                expenseDate.getMonth() === today.getMonth() &&
                expenseDate.getFullYear() === today.getFullYear()
            );
        })
        .reduce((total, expense) => total + Number(expense.amount), 0);

    const monthlyData = Array.from({ length: 12 }, (_, index) => {
        const monthName = new Date(
            0,
            index,
        ).toLocaleString("en-IN", {
            month: "short",
        });

        const total = expenses
            .filter((expense) => {
                const date = new Date(expense.date);

                return date.getMonth() === index;
            })
            .reduce(
                (sum, expense) =>
                    sum + Number(expense.amount),
                0
            );

        return {
            month: monthName,
            total,
        };
    });

    return (
        <div className="bg-gray-50 min-h-screen">

            <Navbar />

            <div className="flex flex-col lg:flex-row">

                <Sidebar />

                <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8">

                    <div className="max-w-7xl mx-auto">

                        <div className="mb-8">
                            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900">
                                Welcome back 👋
                            </h1>

                            <p className="text-gray-500 mt-1">
                                Here's what's happening with your finances.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4 lg:gap-6">

                            <SummaryCard
                                title="Total Expenses"
                                value={`₹${totalExpenses.toLocaleString("en-IN")}`}
                                icon="💰"
                                description="All time spending"
                            />

                            <SummaryCard
                                title="This Month"
                                value={`₹${thisMonthExpenses.toLocaleString("en-IN")}`}
                                icon="📅"
                                description="Current month"
                            />

                            <SummaryCard
                                title="Transactions"
                                value={totalTransactions}
                                icon="🧾"
                                description="Total transactions"
                            />

                            <SummaryCard
                                title="Today's Expense"
                                value={`₹${todaysExpenses.toLocaleString("en-IN")}`}
                                icon="📊"
                                description="Spent today"
                            />

                        </div>

                        <div className="mt-10">
                            <div className="mb-4">
                                <h2 className="text-xl font-semibold text-gray-900">
                                    {editingExpense ? "Edit Expense" : "Add Expense"}
                                </h2>

                                <p className="text-sm text-gray-500 mt-1">
                                    {editingExpense
                                        ? "Update the details of your expense."
                                        : "Track a new expense in your account."
                                    }
                                </p>
                            </div>

                            <ExpenseForm
                                onExpenseAdded={fetchExpenses}
                                editingExpense={editingExpense}
                                setEditingExpense={setEditingExpense}
                            />
                        </div>

                        <div className="mt-10">
                            {loading ? (
                                <div className="bg-white border border-gray-100 rounded-2xl p-10 text-center shadow-sm">
                                    <div className="inline-flex items-center gap-2 text-gray-500">
                                        <div className="w-5 h-5 border-2 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
                                        <span className="text-sm font-medium">
                                            Loading expenses...
                                        </span>
                                    </div>
                                </div>
                            ) : expenses.length === 0 ? (
                                <EmptyState />
                            ) : (
                                <>
                                    <div className="mb-4">
                                        <h2 className="text-xl font-semibold text-gray-900">
                                            Recent Expenses
                                        </h2>

                                        <p className="text-sm text-gray-500 mt-1">
                                            View and manage your latest transactions.
                                        </p>
                                    </div>

                                    <ExpenseTable
                                        expenses={expenses}
                                        onDelete={handleDelete}
                                        onEdit={handleEdit}
                                        deletingId={deletingId}
                                    />
                                    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-8">
                                        <ExpensePieChart expenses={expenses} />

                                        <MonthlyExpenseChart data={monthlyData} />
                                    </div>

                                    <RecentTransactions expenses={expenses} />
                                </>
                            )}
                        </div>
                    </div>
                </main>

            </div>

        </div>
    );
}

export default Dashboard;