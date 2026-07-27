import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

function Dashboard() {
    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <div className="min-h-screen flex flex-col items-center justify-center bg-slate-100">

            <h1 className="text-4xl font-bold mb-6">
                Dashboard
            </h1>

            <button
                onClick={handleLogout}
                className="bg-red-600 text-white px-6 py-3 rounded-lg hover:bg-red-700"
            >
                Logout
            </button>

        </div>
    );
}

export default Dashboard;