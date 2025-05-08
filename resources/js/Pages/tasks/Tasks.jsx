import React from "react";
import { router } from "@inertiajs/react";

const Tasks = ({ tasks, total, totalPages, currentPage }) => {
    const params = new URLSearchParams(window.location.search);
    const limit = parseInt(params.get("limit")) || 10;
    const offset = parseInt(params.get("offset")) || 0;

    const handlePageChange = (direction) => {
        const newOffset =
            direction === "next" ? offset + limit : Math.max(0, offset - limit);
        router.get("/tasks", { limit, offset: newOffset });
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-800 mb-2">
                    Task List
                </h2>
                <div className="h-1 w-20 bg-blue-500"></div>
            </div>

            <div className="bg-white rounded-lg shadow-lg">
                <div className="divide-y divide-gray-200">
                    {tasks?.map((task, index) => (
                        <div
                            key={index}
                            className="p-6 hover:bg-gray-50 transition duration-150"
                        >
                            <div className="flex items-center justify-between mb-2">
                                <div className="flex items-center space-x-2">
                                    <div className="h-8 w-8 rounded-full bg-blue-100 flex items-center justify-center">
                                        <span className="text-blue-600 font-semibold">
                                            {task?.id}
                                        </span>
                                    </div>
                                    <span className="text-sm text-gray-500">
                                        Posted on{" "}
                                        {new Date(
                                            task?.created_at
                                        ).toLocaleDateString("en-US", {
                                            year: "numeric",
                                            month: "long",
                                            day: "numeric",
                                        })}
                                    </span>
                                </div>
                                <span className="px-3 py-1 text-xs font-medium bg-green-100 text-green-800 rounded-full">
                                    Active
                                </span>
                            </div>
                            <p className="text-gray-700 text-xs leading-relaxed">
                                {task?.body}
                            </p>
                        </div>
                    ))}
                </div>
            </div>

            <div className="flex justify-between items-center mt-6">
                <div className="text-sm text-gray-600">
                    Showing {offset + 1} to {Math.min(offset + limit, total)} of{" "}
                    {total} tasks per page
                    <span>
                        &nbsp;|&nbsp;
                        <span className="font-semibold">
                            {currentPage}
                        </span> of {totalPages} pages
                    </span>
                </div>
                <div className="flex gap-3">
                    <button
                        onClick={() => handlePageChange("prev")}
                        className={`px-4 py-2 rounded-md transition duration-150 flex items-center gap-2
              ${
                  offset === 0
                      ? "bg-gray-100 text-gray-400 cursor-not-allowed"
                      : "bg-white text-gray-700 hover:bg-gray-50 border border-gray-300"
              }`}
                        disabled={offset === 0}
                    >
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M15 19l-7-7 7-7"
                            />
                        </svg>
                        Previous
                    </button>
                    <button
                        onClick={() => handlePageChange("next")}
                        className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 
              transition duration-150 flex items-center gap-2"
                    >
                        Next
                        <svg
                            className="w-5 h-5"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M9 5l7 7-7 7"
                            />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Tasks;
