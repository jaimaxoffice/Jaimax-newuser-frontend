import React from "react";
import { XCircle, Clock } from "lucide-react";

const SellToCompanyModal = ({ sellModal, onClose }) => {
    if (!sellModal.show) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-md">
            {/* Subtle grid background pattern */}
            <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMzIiIGhlaWdodD0iMzIiIHZpZXdCb3g9IjAgMCAzMiAzMiIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHJhZGllbnQgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LCAwLjUpIiBvcGFjaXR5PSIwLjIiLz4KPHJhZGllbnQgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LCAwLjUpIiBvcGFjaXR5PSIwLjIiIHRyYW5zZm9ybT0idHJhbnNsYXRlKDIsIDIpIi8+CjxwYXRoIGQ9Ik0wIDBoMzJ2MzJaIiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjdGVhbC0xKSIvPgo8L3N2Zz4=')] opacity-5" />

            {/* Main Modal */}
            <div className="relative bg-white rounded-xl shadow-2xl w-[90%] max-w-md overflow-hidden border border-gray-100">
                {/* Header with subtle texture */}
                <div className="relative h-16 bg-gradient-to-r from-gray-50 to-gray-100 flex items-center px-6">
                    <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAlIiBoZWlnaHQ9IjEwMCUiPgo8cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjdGVhbC0xKSIvPgo8cGF0aCBkPSJNMCAwaDEwMHYxMDBIMHoiIGZpbGw9Im5vbmUiIHN0cm9rZT0idXJsKCN0ZWFkLTEpIiBvcGFjaXR5PSIwLjAiLz4KPHBhdGggZD0iTTAgMGgxMDB2MTIwaC0xMDB6IiBmaWxsPSJub25lIiBzdHJva2U9InVybCgjdGVhbC0xKSIgb3BhY2l0eT0iMC4yIi8+Cjwvc3ZnPg==')] opacity-30" />

                    <h3 className="text-gray-800 font-semibold text-lg relative z-10">
                        Sell Order Processing
                    </h3>

                    <button
                        onClick={onClose}
                        className="absolute right-4 w-8 h-8 rounded-full bg-white/80 hover:bg-white shadow-sm flex items-center justify-center transition-all"
                    >
                        <XCircle size={16} className="text-gray-500" />
                    </button>
                </div>

                {/* Content with financial chart illustration */}
                <div className="p-8 text-center relative">
                    {/* Subtle chart illustration */}
                    <div className="absolute top-0 left-0 w-full h-24 opacity-10 pointer-events-none">
                        <svg viewBox="0 0 300 80" className="w-full h-full">
                            <path
                                d="M0,60 Q50,20 100,50 T200,30 T300,50"
                                stroke="url(#chartGradient)"
                                strokeWidth="1.5"
                                fill="none"
                                strokeLinecap="round"
                            />
                            <defs>
                                <linearGradient
                                    id="chartGradient"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="0%"
                                >
                                    <stop offset="0%" stopColor="#10b981" />
                                    <stop offset="100%" stopColor="#059669" />
                                </linearGradient>
                            </defs>
                        </svg>
                    </div>

                    {/* Main Icon with document stack */}
                    <div className="mx-auto w-20 h-20 mb-6 relative">
                        <div className="absolute -bottom-1 -right-1 w-16 h-10 bg-gradient-to-br from-emerald-100 to-green-100 rounded-t-lg rounded-br-lg border border-gray-200 transform rotate-2" />
                        <div className="absolute bottom-0 right-0 w-16 h-10 bg-white rounded-t-lg rounded-br-lg border border-gray-200 transform -rotate-1 shadow-sm" />
                        <div className="absolute inset-0 flex items-center justify-center">
                            <div className="w-8 h-8 bg-emerald-500 rounded-full flex items-center justify-center shadow-md">
                                <Clock className="text-white" size={16} />
                            </div>
                        </div>
                    </div>

                    {/* Message with typewriter effect */}
                    <div className="space-y-3 relative z-10">
                        <h4 className="text-gray-800 font-medium text-lg">
                            {sellModal.message}
                        </h4>
                        <p className="text-gray-500 text-sm">
                            Your sell order system is being finalized
                        </p>
                    </div>

                    {/* Progress with animated dots */}
                    <div className="mt-6">
                        <div className="flex items-center justify-center gap-1 mb-4">
                            {[...Array(5)].map((_, i) => (
                                <div
                                    key={i}
                                    className={`w-2 h-2 rounded-full ${i < 3 ? "bg-emerald-500" : "bg-gray-200"
                                        } transition-all duration-300`}
                                    style={{ animationDelay: `${i * 100}ms` }}
                                />
                            ))}
                        </div>

                        <div className="flex items-center justify-center gap-2 text-sm text-gray-600">
                            <span className="w-20 h-1 bg-gradient-to-r from-emerald-400 to-green-500 rounded-full" />
                            <span>Processing</span>
                            <span className="w-20 h-1 bg-gray-200 rounded-full" />
                        </div>
                    </div>


                </div>
            </div>
        </div>
    );
};

export default SellToCompanyModal;