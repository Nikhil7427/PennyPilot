function SummaryCard({ title, value, icon, description }) {
    return (
        <div className="group bg-white border border-gray-100 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200">
            
            <div className="flex items-start justify-between gap-4">

                <div className="min-w-0">
                    <p className="text-sm font-medium text-gray-500">
                        {title}
                    </p>

                    <p className="text-2xl sm:text-3xl font-bold text-gray-900 mt-2 truncate">
                        {value}
                    </p>

                    {description && (
                        <p className="text-xs text-gray-400 mt-2">
                            {description}
                        </p>
                    )}
                </div>

                <div className="shrink-0 w-11 h-11 rounded-xl bg-blue-50 flex items-center justify-center text-xl group-hover:scale-105 transition-transform">
                    {icon}
                </div>

            </div>
        </div>
    );
}

export default SummaryCard;