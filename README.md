# PennyPilot 💰

An AI-ready full-stack expense tracker built with React, Node.js, Express.js, and PostgreSQL. PennyPilot allows users to securely manage their daily expenses, visualize spending patterns, and access their financial data from anywhere.

## 🚀 Live Demo

- **Frontend:** https://penny-pilot-two.vercel.app/login
- **Backend API:** https://pennypilot-backend-pxm6.onrender.com

## ✨ Features

### 🔐 Authentication

- User Registration
- User Login
- JWT Authentication
- Protected Routes
- Automatic Login after Registration
- Logout

### 💰 Expense Management

- Add Expenses
- Edit Expenses
- Delete Expenses
- Expense Categories
- Date Tracking
- Notes Support
- Toast Notifications

### 📊 Dashboard Analytics

- Total Expenses
- Total Transactions
- Today's Expenses
- This Month's Expenses
- Recent Transactions
- Expense Table
- Category-wise Pie Chart
- Monthly Expense Bar Chart

### 📱 Responsive Design

- Mobile-friendly Dashboard
- Responsive Forms
- Responsive Tables
- Responsive Charts
- Responsive Sidebar
- Desktop and Mobile Support

## 🛠️ Tech Stack

### Frontend

- React
- React Router
- React Hook Form
- Tailwind CSS
- Axios
- Recharts
- React Toastify
- Vite

### Backend

- Node.js
- Express.js
- JWT
- bcrypt
- CORS
- dotenv

### Database

- PostgreSQL
- Drizzle ORM
- Neon PostgreSQL

### Deployment

- Vercel — Frontend
- Render — Backend
- Neon — Database

## 📂 Project Structure

```text
PennyPilot/
│
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── context/
│   │   ├── pages/
│   │   └── services/
│   │
│   └── public/
│
├── backend/
│   └── src/
│       ├── controllers/
│       ├── db/
│       ├── middleware/
│       └── routes/
│
└── README.md