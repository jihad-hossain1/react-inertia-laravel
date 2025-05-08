import { Link } from "@inertiajs/react";
import React from "react";

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col">
            <header className="bg-white shadow-md">
                <div className="container mx-auto px-4 py-4">
                    <nav className="flex justify-between items-center">
                        <Link 
                            href="/" 
                            className="text-xl font-bold text-gray-800 hover:text-gray-600 transition-colors"
                        >
                            Task Scheduler
                        </Link>
                        <div className="flex gap-6 items-center">
                            <Link 
                                href="/tasks" 
                                className="text-gray-600 hover:text-gray-900 font-medium transition-colors"
                            >
                                Tasks
                            </Link>
                            <Link 
                                href="/tasks/new" 
                                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition-colors"
                            >
                                Create Task
                            </Link>
                        </div>
                    </nav>
                </div>
            </header>

            <main className="flex-grow container mx-auto px-4 py-8">
                {children}
            </main>

            <footer className="bg-gray-50 border-t border-gray-200">
                <div className="container mx-auto px-4 py-6">
                    <p className="text-center text-gray-600">
                        © {new Date().getFullYear()} YourBrand. All rights reserved.
                    </p>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
