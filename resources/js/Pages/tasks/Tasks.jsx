import React from "react";
import { router } from "@inertiajs/react";

const Tasks = ({ tasks }) => {
    console.log("🚀 ~ Tasks ~ tasks:", tasks)
    

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

          
        </div>
    );
};

export default Tasks;
