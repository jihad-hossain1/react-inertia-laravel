import { useForm, router, usePage } from "@inertiajs/react";
import { useState } from "react";

const TaskForm = () => {
    const { data, setData } = useForm({
        title: "",
        description: "",
        priority: "low",
        due_date: "",
    });
    const [errors, setErrors] = useState({});
    console.log("🚀 ~ TaskForm ~ errors:", errors)
    const [success, setSuccess] = useState("");
    const [loading, setLoading] = useState(false);

    const submit = async (e) => {
        e.preventDefault();
        setLoading(true);
        setErrors({});
        try {
            const re = await fetch("http://localhost:8000/api/tasks", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(data),
            });

            setLoading(false);

            const js = await re.json();
            console.log("🚀 ~ submit ~ js:", js)

            if (js?.success) {
                setSuccess(js?.success);

                return;
            }

            if (js?.errors) {
                setErrors({...js?.errors,message: js?.message});
            }
            // post('/api/tasks')
        } catch (error) {
            console.log(error?.message);
        }
    };

    return (
        <form onSubmit={submit} className="flex flex-col gap-2">
            {errors?.message && (
                <div className="text-xs text-red-500">{errors?.message} </div>
            )}
            {success && (
                <span className="text-green-600 text-sm bg-green-100">
                    {success}
                </span>
            )}
            <input
                className="border p-2 border-gray-200"
                type="text"
                value={data.title}
                onChange={(e) => setData("title", e.target.value)}
            />
            {errors?.title && (
                <div className="text-xs text-red-500">{errors?.title[0]}</div>
            )}

            <input
                className="border p-2 border-gray-200"
                type="text"
                value={data.description}
                onChange={(e) => setData("description", e.target.value)}
            />
            {errors?.description && (
                <div className="text-xs text-red-500">
                    {errors?.description[0]}
                </div>
            )}

            <input
                className="border p-2 border-gray-200"
                type="text"
                value={data.priority}
                onChange={(e) => setData("priority", e.target.value)}
            />
            {errors?.priority && (
                <div className="text-xs text-red-500">
                    {errors?.priority[0]}
                </div>
            )}

            <input
                className="border p-2 border-gray-200"
                type="date"
                value={data.due_date}
                onChange={(e) => setData("due_date", e.target.value)}
            />
            {errors?.due_date && (
                <div className="text-xs text-red-500">
                    {errors?.due_date[0]}
                </div>
            )}

            <button type="submit" disabled={loading}>
                {loading ? "Processing..." : " Create Task"}
            </button>
        </form>
    );
};

export default TaskForm;
