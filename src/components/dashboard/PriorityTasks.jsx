import { useState } from "react";
import { CheckCircle, Circle, Plus, ArrowRight } from "lucide-react";
import {Link} from 'react-router-dom';

export default function PriorityTasks() {
    const [tasks, setTasks] = useState([
        {
            id: "1",
            title: "Complete project proposal",
            completed: false,
            dueTime: "2:00 PM",
            priority: "high",
        },
        {
            id: "2",
            title: "Read 30 pages of textbook",
            completed: false,
            priority: "medium",
        },
        {
            id: "3",
            title: "Schedule team meeting",
            completed: true,
            priority: "medium",
        },
        {
            id: "4",
            title: "Prepare presentation slides",
            completed: false,
            priority: "high",
        },
    ]);

    const toggleTaskCompletion = (taskId) => {
        setTasks(
            tasks.map((task) =>
                task.id === taskId ? { ...task, completed: !task.completed } : task
            )
        );
    };

    const getPriorityColor = (priority) => {
        switch (priority) {
            case "high":
                return "bg-red-100 text-red-800";
            case "medium":
                return "bg-amber-100 text-amber-800";
            case "low":
                return "bg-blue-100 text-blue-800";
            default:
                return "bg-gray-100 text-gray-800";
        }
    };

    return (
        <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-6 border-b border-[#e2e8f0]">
                <h2 className="text-lg font-semibold text-[#0f172a]">Priority Tasks</h2>
                <Link
                    href="/tasks"
                    className="text-sm text-[#07b0ed] hover:underline flex items-center"
                >
                    View All <ArrowRight className="w-4 h-4 ml-1" />
                </Link>
            </div>

            <div className="p-4">
                {tasks.length > 0 ? (
                    <div className="space-y-3">
                        {tasks.map((task) => (
                            <div
                                key={task.id}
                                className={`flex items-center p-3 rounded-lg border ${
                                    task.completed
                                        ? "border-[#e2e8f0] bg-[#f8fafc]"
                                        : "border-[#e2e8f0] hover:border-[#bae6fd]"
                                }`}
                            >
                                <button
                                    onClick={() => toggleTaskCompletion(task.id)}
                                    className="flex-shrink-0 mr-3"
                                >
                                    {task.completed ? (
                                        <CheckCircle className="w-5 h-5 text-[#07b0ed]" />
                                    ) : (
                                        <Circle className="w-5 h-5 text-[#cbd5e1]" />
                                    )}
                                </button>

                                <div className="flex-1 min-w-0">
                                    <p
                                        className={`text-sm font-medium ${
                                            task.completed
                                                ? "text-[#94a3b8] line-through"
                                                : "text-[#0f172a]"
                                        }`}
                                    >
                                        {task.title}
                                    </p>
                                    {task.dueTime && (
                                        <p className="text-xs text-[#64748b]">
                                            Due at {task.dueTime}
                                        </p>
                                    )}
                                </div>

                                <div
                                    className={`px-2 py-1 rounded text-xs font-medium ${getPriorityColor(
                                        task.priority
                                    )}`}
                                >
                                    {task.priority.charAt(0).toUpperCase() +
                                        task.priority.slice(1)}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-8">
                        <p className="text-[#64748b] mb-4">No priority tasks for today</p>
                    </div>
                )}

                <div className="mt-4">
                    <Link
                        href="/tasks/new"
                        className="flex items-center justify-center w-full py-3 border border-dashed border-[#cbd5e1] rounded-md text-sm text-[#64748b] hover:border-[#07b0ed] hover:text-[#07b0ed] transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Add New Task
                    </Link>
                </div>
            </div>
        </div>
    );
}
