import { Link } from "@inertiajs/react";
import React from "react";

const Home = ({ name }) => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
            {/* Hero Section */}
            <div className="container mx-auto px-4 py-16">
                <div className="text-center animate-fade-in">
                    <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6 animate-slide-up">
                        Task Management
                        <span className="text-blue-500"> Simplified</span>
                    </h1>
                    <p className="text-xl text-gray-600 mb-8 animate-slide-up-delay">
                        Organize, track, and accomplish your tasks with ease
                    </p>
                    <div className="flex justify-center gap-4">
                        <Link
                            href="/tasks"
                            className="bg-blue-500 text-white px-8 py-3 rounded-lg hover:bg-blue-600 transition-all transform hover:scale-105 animate-bounce-subtle"
                        >
                            Get Started
                        </Link>
                        <Link
                            href="/tasks/new"
                            className="bg-white text-blue-500 border-2 border-blue-500 px-8 py-3 rounded-lg hover:bg-blue-50 transition-all transform hover:scale-105"
                        >
                            Create Task
                        </Link>
                    </div>
                </div>

                {/* Features Section */}
                <div className="grid md:grid-cols-3 gap-8 mt-20">
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up">
                        <div className="text-blue-500 text-4xl mb-4">📋</div>
                        <h3 className="text-xl font-semibold mb-2">Task Organization</h3>
                        <p className="text-gray-600">Keep your tasks organized and structured for maximum productivity</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up-delay">
                        <div className="text-blue-500 text-4xl mb-4">⏰</div>
                        <h3 className="text-xl font-semibold mb-2">Time Tracking</h3>
                        <p className="text-gray-600">Monitor time spent on tasks and improve your efficiency</p>
                    </div>
                    <div className="bg-white p-6 rounded-xl shadow-lg hover:shadow-xl transition-shadow animate-fade-in-up-delay-2">
                        <div className="text-blue-500 text-4xl mb-4">📊</div>
                        <h3 className="text-xl font-semibold mb-2">Progress Analytics</h3>
                        <p className="text-gray-600">Track your progress with detailed analytics and insights</p>
                    </div>
                </div>
            </div>

            {/* Add this to your global CSS file */}
            <style>{`
                @keyframes fadeIn {
                    from { opacity: 0; }
                    to { opacity: 1; }
                }
                @keyframes slideUp {
                    from { transform: translateY(20px); opacity: 0; }
                    to { transform: translateY(0); opacity: 1; }
                }
                .animate-fade-in {
                    animation: fadeIn 1s ease-out;
                }
                .animate-slide-up {
                    animation: slideUp 0.8s ease-out;
                }
                .animate-slide-up-delay {
                    animation: slideUp 0.8s ease-out 0.2s both;
                }
                .animate-fade-in-up {
                    animation: slideUp 0.8s ease-out;
                }
                .animate-fade-in-up-delay {
                    animation: slideUp 0.8s ease-out 0.2s both;
                }
                .animate-fade-in-up-delay-2 {
                    animation: slideUp 0.8s ease-out 0.4s both;
                }
                .animate-bounce-subtle {
                    animation: bounce 2s infinite;
                }
                @keyframes bounce {
                    0%, 100% { transform: translateY(0); }
                    50% { transform: translateY(-5px); }
                }
            `}</style>
        </div>
    );
};

export default Home;
