function Sidebar() {

    const menuItems = [
        {
            name: "Dashboard",
            icon: "🏠",
        },
        {
            name: "Expenses",
            icon: "💳",
        },
        {
            name: "Analytics",
            icon: "📊",
        },
        {
            name: "Reports",
            icon: "📄",
        },
        {
            name: "Settings",
            icon: "⚙️",
        },
    ];

    return (
        <aside className="hidden lg:flex w-64 shrink-0 bg-white border-r border-gray-100 min-h-[calc(100vh-4rem)]">

            <div className="w-full p-5">

                {/* Navigation title */}
                <div className="mb-6 px-3">
                    <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                        Menu
                    </p>
                </div>

                {/* Navigation */}
                <nav className="space-y-1">

                    {menuItems.map((item, index) => (

                        <button
                            key={item.name}
                            className={`w-full flex items-center gap-3 px-3 py-3 rounded-xl text-sm font-medium transition-colors ${
                                index === 0
                                    ? "bg-blue-50 text-blue-600"
                                    : "text-gray-600 hover:bg-gray-50 hover:text-gray-900"
                            }`}
                        >

                            <span className="text-lg">
                                {item.icon}
                            </span>

                            <span>
                                {item.name}
                            </span>

                        </button>

                    ))}

                </nav>

                {/* Bottom card */}
                <div className="mt-10 p-4 rounded-2xl bg-blue-50 border border-blue-100">

                    <div className="text-2xl mb-2">
                        💡
                    </div>

                    <p className="text-sm font-semibold text-blue-900">
                        Track your spending
                    </p>

                    <p className="text-xs text-blue-600 mt-1 leading-relaxed">
                        Keep your expenses organized and understand your financial habits.
                    </p>

                </div>

            </div>

        </aside>
    );
}

export default Sidebar;