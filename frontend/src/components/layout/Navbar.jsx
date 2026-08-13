import { useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

function Navbar() {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate("/login");
    };

    return (
        <nav className="sticky top-0 z-50 bg-white border-b border-gray-100">

            <div className="px-4 sm:px-6 lg:px-8">

                <div className="h-16 flex items-center justify-between">

                    {/* Logo */}
                    <div className="flex items-center gap-3">

                        <div className="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center shadow-sm">
                            <span className="text-white text-lg font-bold">
                                P
                            </span>
                        </div>

                        <div>
                            <h1 className="text-xl font-bold text-gray-900">
                                PennyPilot
                            </h1>

                            <p className="hidden sm:block text-xs text-gray-400">
                                Personal Finance
                            </p>
                        </div>

                    </div>

                    {/* Right side */}
                    <div className="flex items-center gap-3">

                        <div className="hidden sm:block text-right">
                            <p className="text-sm font-medium text-gray-700">
                                My Account
                            </p>

                            <p className="text-xs text-gray-400">
                                Expense Tracker
                            </p>
                        </div>

                        <button
                            onClick={handleLogout}
                            className="flex items-center gap-2 px-3 sm:px-4 py-2 rounded-lg bg-red-50 text-red-600 hover:bg-red-100 transition-colors text-sm font-medium"
                        >
                            <span>↪</span>
                            <span className="hidden sm:inline">
                                Logout
                            </span>
                        </button>

                    </div>

                </div>

            </div>

        </nav>
    );
}

export default Navbar;