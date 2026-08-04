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
        <div className="bg-slate-100 min-h-screen">

            <Navbar />

            <div className="flex flex-col lg:flex-row">

                <Sidebar />

                <main className="flex-1 p-4 md:p-6 lg:p-8">

                    <div className="max-w-7xl mx-auto">

                        <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold mb-6">
                            Welcome Back 👋
                        </h1>

                        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">

                            <SummaryCard
                                title="Total Expenses"
                                value={`₹${totalExpenses.toLocaleString("en-IN")}`}
                            />

                            <SummaryCard
                                title="Transactions"
                                value={totalTransactions}
                            />

                            <SummaryCard
                                title="This Month"
                                value={`₹${thisMonthExpenses.toLocaleString("en-IN")}`}
                            />

                            <SummaryCard
                                title="Today's Expense"
                                value={`₹${todaysExpenses.toLocaleString("en-IN")}`}
                            />

                        </div>

                        <div className="mt-8">
                            <ExpenseForm
                                onExpenseAdded={fetchExpenses}
                                editingExpense={editingExpense}
                                setEditingExpense={setEditingExpense}
                            />
                        </div>

                        <div className="mt-8">
                            {loading ? (
                                <div className="text-center py-10">
                                    <p className="text-lg font-semibold animate-pulse">
                                        Loading expenses...
                                    </p>
                                </div>
                            ) : expenses.length === 0 ? (
                                <EmptyState />
                            ) : (
                                <>
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