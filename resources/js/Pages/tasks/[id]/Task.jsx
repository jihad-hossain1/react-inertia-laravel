import { useState } from "react";
import {
    SquarePen,
    Trash2,
    Clock,
    Calendar,
    MessageSquare,
    ChevronDown,
    ChevronUp,
    Eye,
} from "lucide-react";
import { useForm } from "@inertiajs/react";
import { useRoute } from "../../../../../vendor/tightenco/ziggy";

const Task = ({ task }) => {
    const route = useRoute();
    const [isDetailsOpen, setIsDetailsOpen] = useState(false);
    const [commentText, setCommentText] = useState("");
    const { delete: destroy } = useForm();

    function handleDelete(e) {
        e.preventDefault();
        if (confirm("Are you sure you want to delete this task?")) {
            // Would call destroy route here
            destroy(route("tasks.destroy", task));
        }
    }

    const priorityStyles = {
        low: "bg-emerald-50 text-emerald-700 border border-emerald-200",
        medium: "bg-amber-50 text-amber-700 border border-amber-200",
        high: "bg-rose-50 text-rose-700 border border-rose-200",
    };

    return (
        <div className="bg-white rounded-xl shadow-md border border-gray-100 overflow-hidden max-w-5xl mx-auto">
            {/* Header */}
            <div className="border-b border-gray-100 p-6">
                <div className="flex items-start justify-between">
                    <div className="flex items-center gap-4">
                        <div className="flex-shrink-0">
                            <div
                                className={`w-3 h-3 rounded-full ${
                                    task.priority === "high"
                                        ? "bg-rose-500"
                                        : task.priority === "medium"
                                        ? "bg-amber-500"
                                        : "bg-emerald-500"
                                }`}
                            ></div>
                        </div>
                        <h2 className="text-lg font-semibold text-gray-900 leading-tight">
                            {task?.title}
                        </h2>
                    </div>
                    <div className="flex items-center space-x-2">
                        <span
                            className={`text-xs px-3 py-1 rounded-full font-medium ${
                                priorityStyles[task.priority]
                            }`}
                        >
                            {task.priority}
                        </span>
                    </div>
                </div>
            </div>

            {/* Content */}
            <div className="p-6">
                <div className="mb-6">
                    <TextContent text={task.description} />
                </div>

                {/* Metadata */}
                <div className="flex flex-wrap gap-4 mb-6 text-sm">
                    <div className="flex items-center gap-1.5 text-gray-600">
                        <Calendar className="h-4 w-4" />
                        <span>
                            Due:{" "}
                            <span className="font-medium text-gray-900">
                                {task.due_date}
                            </span>
                        </span>
                    </div>
                    <div className="flex items-center gap-1.5 text-gray-600">
                        <Clock className="h-4 w-4" />
                        <span>
                            Updated:{" "}
                            <span className="font-medium">
                                {new Date(task.updated_at).toLocaleDateString()}
                            </span>
                        </span>
                    </div>
                </div>

                {/* Details toggle */}
                <button
                    onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                    className="flex items-center text-sm font-medium text-gray-600 hover:text-gray-900 mb-6 focus:outline-none"
                >
                    {isDetailsOpen ? (
                        <ChevronUp className="h-4 w-4 mr-1" />
                    ) : (
                        <ChevronDown className="h-4 w-4 mr-1" />
                    )}
                    {isDetailsOpen ? "Hide details" : "Show details"}
                </button>

                {/* Details content */}
                {isDetailsOpen && (
                    <div className="mb-6 bg-gray-50 p-4 rounded-lg text-sm">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p className="text-gray-500">Created</p>
                                <p className="font-medium">
                                    {new Date(task.created_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500">Last Updated</p>
                                <p className="font-medium">
                                    {new Date(task.updated_at).toLocaleString()}
                                </p>
                            </div>
                            <div>
                                <p className="text-gray-500">Status</p>
                                <p className="font-medium">In Progress</p>
                            </div>
                            <div>
                                <p className="text-gray-500">Assigned to</p>
                                <p className="font-medium">Alex Morgan</p>
                            </div>
                        </div>
                    </div>
                )}

                {/* Actions */}
                <div className="flex gap-2 mb-6">
                    <a
                        href={`/tasks/${task.id}/edit`}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-md transition-colors"
                    >
                        <SquarePen className="h-4 w-4" />
                        <span>Edit</span>
                    </a>
                    <button
                        onClick={handleDelete}
                        className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-rose-50 text-gray-700 hover:text-rose-700 text-sm font-medium rounded-md transition-colors"
                    >
                        <Trash2 className="h-4 w-4" />
                        <span>Delete</span>
                    </button>
                    <button className="flex items-center gap-1.5 px-3 py-1.5 bg-gray-50 hover:bg-gray-100 text-gray-700 text-sm font-medium rounded-md transition-colors ml-auto">
                        <Eye className="h-4 w-4" />
                        <span>Preview</span>
                    </button>
                </div>

                {/* Comment form */}
                <div className="bg-gray-50 rounded-lg p-4">
                    <label
                        htmlFor="comment"
                        className="block text-sm font-medium text-gray-700 mb-2"
                    >
                        Add Comment
                    </label>
                    <div className="mb-3">
                        <textarea
                            id="comment"
                            name="comment"
                            value={commentText}
                            onChange={(e) => setCommentText(e.target.value)}
                            className="w-full px-3 py-2 bg-white border border-gray-200 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm"
                            rows={3}
                            placeholder="Write your comment here..."
                        ></textarea>
                    </div>
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md transition-colors"
                        >
                            <MessageSquare className="h-4 w-4" />
                            <span>Post Comment</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

function TextContent({ text }) {
    const [expanded, setExpanded] = useState(false);

    if (!text) return null;

    const maxLength = 300;
    const isTruncated = text.length > maxLength;
    const displayText =
        expanded || !isTruncated ? text : `${text.substring(0, maxLength)}...`;

    return (
        <div className="text-gray-700 text-sm leading-relaxed">
            <p>{displayText}</p>
            {isTruncated && (
                <button
                    onClick={() => setExpanded(!expanded)}
                    className="mt-2 text-blue-600 hover:text-blue-800 text-sm font-medium focus:outline-none"
                >
                    {expanded ? "Show Less" : "Show More"}
                </button>
            )}
        </div>
    );
}

export default Task;
