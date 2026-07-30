function Sidebar() {
    return(
        <aside className="w-64 bg-white shadow-md min-h-screen p-6">
            <h2 className="text-xl font-bold mb-8">
                Dashboard
            </h2>

            <ul className="space-y-4">
                <li className="cursor-pointer hover:text-blue-600">
                    Home
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                    Expenses
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                    Reports
                </li>
                <li className="cursor-pointer hover:text-blue-600">
                    Settings
                </li>
            </ul>
        </aside>
    );
}

export default Sidebar;