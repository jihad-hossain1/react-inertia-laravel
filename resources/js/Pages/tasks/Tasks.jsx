import React, { useState, useEffect } from "react";
import {
    PlusCircle,
    Filter,
    Search,
    Calendar,
    ChevronRight,
    CheckCircle,
    AlertCircle,
    Clock,
} from "lucide-react";
import { Link } from "@inertiajs/react";

const Tasks = ({ tasks, taskByStatus }) => {
    const getPriorityClass = (priority) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-800";
            case "medium":
                return "bg-yellow-100 text-yellow-800";
            case "low":
                return "bg-green-100 text-green-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    const getStatusIcon = (status) => {
        switch (status?.toLowerCase()) {
            case "completed":
                return <CheckCircle className="h-4 w-4 text-green-500" />;
            case "progress":
                return <Clock className="h-4 w-4 text-blue-500" />;
            case "pending":
                return <AlertCircle className="h-4 w-4 text-yellow-500" />;
            default:
                return null;
        }
    };
    const getStatusColor = (status) => {
        switch (status?.toLowerCase()) {
            case "completed":
                return "bg-green-100 text-green-800";
            case "progress":
                return "bg-yellow-100 text-yellow-800";
            case "pending":
                return "bg-gray-100 text-gray-800";
            default:
                return null;
        }
    };

    const getDaysRemaining = (dueDate) => {
        const today = new Date();
        const due = new Date(dueDate);
        const diffTime = due - today;
        const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
        return diffDays;
    };

    return (
        <div className="bg-gray-50 min-h-screen">
            <div className="max-w-7xl mx-auto p-6">
                {/* Header section */}
                <div className="flex items-center justify-between mb-8">
                    <div>
                        <h2 className="text-3xl font-bold text-gray-800 mb-2">
                            Task Dashboard
                        </h2>
                        <div className="h-1 w-20 bg-indigo-600"></div>
                        <p className="text-gray-600 mt-2">
                            Manage and track your tasks efficiently
                        </p>
                    </div>
                    <a
                        href="/tasks/create"
                        className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg shadow transition duration-150"
                    >
                        <PlusCircle className="h-5 w-5" />
                        <span>New Task</span>
                    </a>
                </div>

                {/* Flash message */}
                <FlashMessage />

                {/* Search and filters */}
                <Actions />

                {/* Task list */}
                <div className="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div className="divide-y divide-gray-200">
                        {tasks?.data?.map((task) => (
                            <div
                                key={task.id}
                                className="p-6 hover:bg-gray-50 transition duration-150"
                            >
                                <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
                                    <div className="flex items-start gap-4">
                                        <div className="h-12 w-12 rounded-full bg-indigo-100 flex items-center justify-center flex-shrink-0">
                                            <span className="text-indigo-600 font-semibold">
                                                {task.id}
                                            </span>
                                        </div>
                                        <div>
                                            <div className="flex items-center gap-2 mb-1">
                                                {getStatusIcon(task.status)}
                                                <h4 className="text-lg font-semibold text-gray-800">
                                                    {task.title}
                                                </h4>
                                            </div>
                                            <p className="text-gray-600 text-sm mb-2">
                                                {task.description.length > 120
                                                    ? task.description.slice(
                                                          0,
                                                          120
                                                      ) + "..."
                                                    : task.description}
                                            </p>
                                            <div className="flex flex-wrap gap-2 text-xs">
                                                <span className="text-gray-500">
                                                    Created:{" "}
                                                    {new Date(
                                                        task.created_at
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                </span>
                                                <span className="text-gray-500">
                                                    •
                                                </span>
                                                <span
                                                    className={
                                                        getDaysRemaining(
                                                            task.due_date
                                                        ) < 0
                                                            ? "text-red-500"
                                                            : "text-gray-500"
                                                    }
                                                >
                                                    Due:{" "}
                                                    {new Date(
                                                        task.due_date
                                                    ).toLocaleDateString(
                                                        "en-US",
                                                        {
                                                            year: "numeric",
                                                            month: "short",
                                                            day: "numeric",
                                                        }
                                                    )}
                                                    {getDaysRemaining(
                                                        task.due_date
                                                    ) < 0
                                                        ? " (Overdue)"
                                                        : getDaysRemaining(
                                                              task.due_date
                                                          ) === 0
                                                        ? " (Today)"
                                                        : ` (${getDaysRemaining(
                                                              task.due_date
                                                          )} days left)`}
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="flex items-center gap-3">
                                        <span
                                            className={`px-3 py-1 text-xs font-medium rounded-full ${getPriorityClass(
                                                task.priority
                                            )}`}
                                        >
                                            {task.priority}
                                        </span>
                                        <span className={`text-xs px-3 py-1 rounded-full ${getStatusColor(task.status)}`}>
                                            {task.status}
                                        </span>
                                        <a
                                            href={`/tasks/${task.id}`}
                                            className="ml-2 flex items-center gap-1 text-indigo-600 hover:text-indigo-800"
                                        >
                                            <span className="text-sm">
                                                Details
                                            </span>
                                            <ChevronRight className="h-4 w-4" />
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {/* Pagination */}
                    <Pagination links={tasks.links} />
                </div>

                {/* Summary stats */}
                <Summary total={tasks.total} results={taskByStatus} />
            </div>
        </div>
    );
};

import { usePage } from "@inertiajs/react";
function FlashMessage() {
    const { flash } = usePage().props;
    const [flashMessage, setFlashMessage] = useState({
        message: flash.success,
    });

    // Simulate loading state
    useEffect(() => {
        if (flashMessage.message) {
            const timer = setTimeout(() => {
                setFlashMessage({
                    ...flashMessage,
                    message: null,
                });
            }, 3000);
            return () => clearTimeout(timer);
        }
    }, [flashMessage]);

    if (flashMessage.message) {
        return (
            <div className="bg-green-100 border-l-4 border-green-500 text-green-700 p-4 rounded shadow mb-6 flex justify-between items-center">
                <div className="flex items-center">
                    <CheckCircle className="h-5 w-5 mr-2" />
                    <span>{flashMessage.message}</span>
                </div>
                <button
                    onClick={() =>
                        setFlashMessage({
                            ...flashMessage,
                            message: null,
                        })
                    }
                    className="text-green-700 hover:text-green-900"
                >
                    &times;
                </button>
            </div>
        );
    }

    return <></>;
}

function Actions() {
    const [filterOpen, setFilterOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    return (
        <div className="bg-white rounded-lg shadow-md p-4 mb-6">
            <div className="flex flex-col md:flex-row gap-4">
                <div className="relative flex-grow">
                    <Search className="absolute left-3 top-3 h-5 w-5 text-gray-400" />
                    <input
                        type="text"
                        placeholder="Search tasks..."
                        className="pl-10 pr-4 py-2 w-full border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
                </div>
                <div className="flex gap-3">
                    <button
                        className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50"
                        onClick={() => setFilterOpen(!filterOpen)}
                    >
                        <Filter className="h-5 w-5 text-gray-600" />
                        <span>Filter</span>
                    </button>
                    <button className="flex items-center gap-2 px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                        <Calendar className="h-5 w-5 text-gray-600" />
                        <span>Date Range</span>
                    </button>
                </div>
            </div>

            {filterOpen && (
                <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4 pt-4 border-t border-gray-200">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Priority
                        </label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                            <option value="">All Priorities</option>
                            <option value="high">High</option>
                            <option value="medium">Medium</option>
                            <option value="low">Low</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-1">
                            Status
                        </label>
                        <select className="w-full border border-gray-300 rounded-lg px-3 py-2">
                            <option value="">All Statuses</option>
                            <option value="completed">Completed</option>
                            <option value="in-progress">In Progress</option>
                            <option value="pending">Pending</option>
                        </select>
                    </div>
                    <div className="flex items-end">
                        <button className="bg-indigo-600 hover:bg-indigo-700 text-white px-4 py-2 rounded-lg w-full">
                            Apply Filters
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
}

function Pagination({ links }) {
    return (
        <div className="p-4 flex justify-between items-center border-t border-gray-200">
            <div className="text-sm text-gray-600">
                Showing <span className="font-medium">1</span> to{" "}
                <span className="font-medium">{links?.length}</span> of{" "}
                <span className="font-medium">8</span> tasks
            </div>
            <div className="flex gap-2">
                {links?.map((link, index) => {
                    const isActive = link.active;
                    const isDisabled = !link.url;

                    const baseClasses =
                        "px-3 py-1 rounded-md text-sm transition duration-150 ";
                    const activeClasses = "bg-indigo-600 text-white";
                    const disabledClasses = "text-gray-400 cursor-not-allowed";
                    const defaultClasses = "hover:bg-gray-100 text-gray-700";

                    const className = `${baseClasses} ${
                        isActive
                            ? activeClasses
                            : isDisabled
                            ? disabledClasses
                            : defaultClasses
                    }`;

                    if (isDisabled) {
                        return (
                            <span
                                key={index}
                                className={className}
                                dangerouslySetInnerHTML={{
                                    __html: link.label,
                                }}
                            />
                        );
                    }

                    return (
                        <Link
                            preserveScroll
                            href={link.url}
                            key={index}
                            className={className}
                            dangerouslySetInnerHTML={{
                                __html: link.label,
                            }}
                        />
                    );
                })}
            </div>
        </div>
    );
}

function Summary({
    total = 0,
    results =[ {
        status: 0,
        total: 0,
    }],
}) {
    return (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mt-6">
            <div className="bg-green-50 p-4 rounded-lg shadow-md">
                <div className="text-sm text-gray-500 mb-1">Total Tasks</div>
                <div className="text-2xl font-bold">{total}</div>
            </div>
           
           {results?.map((result) => (
                <div key={result.status} className="bg-white p-4 rounded-lg shadow-md">
                    <div className={`text-sm mb-1 ${result.status == 'Completed' ? 'text-green-600' : result.status == 'Progress' ? 'text-amber-600' : 'text-gray-500'}`}>{result.status}</div>
                    <div className="text-2xl font-bold">{result.total}</div>
                </div>
            ))}
        </div>
    );
}

export default Tasks;
