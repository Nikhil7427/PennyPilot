import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext'

function Navbar() {

    const { logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="bg-white shadow-md px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
            <h1 className="text-xl sm:text-2xl font-bold text-blue-600">
                PennyPilot
            </h1>

            <button
                onClick={handleLogout}
                className="bg-red-500 text-white px-3 sm:px-4 py-2 rounded-lg hover:bg-red-600 text-sm sm:text-base"
            >
                Logout
            </button>
        </nav>
    );
}

export default Navbar