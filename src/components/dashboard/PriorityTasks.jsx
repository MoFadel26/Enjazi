import { useState, useEffect } from "react";
import { CheckCircle, Circle, Plus, ArrowRight } from "lucide-react";
import { Link } from 'react-router-dom';
import TaskModal from "../tasks/EditAddTask";
import { getTodayString } from "../tasks/Tasks";

export default function PriorityTasks() {
    const [tasks, setTasks] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editData, setEditData] = useState(null);

    useEffect(() => {
        const abortController = new AbortController();
        
        const fetchTasks = async () => {
            try {
                const res = await fetch(
                    'http://localhost:5000/api/users/me',
                    {
                        method: 'GET',
                        credentials: 'include',
                        signal: abortController.signal
                    }
                );
                
                const data = await res.json();
                if (!res.ok) throw new Error(data.error || 'Could not load tasks');
                
                // Get tasks from the response
                const userTasks = Array.isArray(data.tasks) ? data.tasks : [];
                
                // Map to the format needed and filter to show only high/medium priority tasks
                const priorityTasks = userTasks
                    .filter(task => task.priority.toLowerCase() === 'high' || task.priority.toLowerCase() === 'medium')
                    .map(task => ({
                        id: task._id,
                        title: task.title,
                        completed: task.completed,
                        dueTime: task.startTime,
                        priority: task.priority.toLowerCase(),
                    }))
                    .slice(0, 4); // Show at most 4 tasks
                
                setTasks(priorityTasks);
            } catch (err) {
                if (err.name !== 'AbortError') setError(err.message);
            } finally {
                setLoading(false);
            }
        };
        
        fetchTasks();
        
        return () => abortController.abort();
    }, []);

    const toggleTaskCompletion = async (taskId) => {
        try {
            // First update local state for immediate feedback
            setTasks(
                tasks.map((task) =>
                    task.id === taskId ? { ...task, completed: !task.completed } : task
                )
            );
            
            // Then update on the server
            const taskToUpdate = tasks.find(task => task.id === taskId);
            if (taskToUpdate) {
                await fetch(`http://localhost:5000/api/tasks/${taskId}`, {
                    method: 'PATCH',
                    credentials: 'include',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ completed: !taskToUpdate.completed })
                });
            }
        } catch (err) {
            console.error('Error toggling task completion:', err);
        }
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

    // Modal handlers
    const openAddModal = () => {
        setEditData(null);
        setIsModalOpen(true);
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    const handleAddTask = async (task) => {
        try {
            const res = await fetch("http://localhost:5000/api/tasks", {
                method: "POST",
                credentials: "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(task)
            });
            const newTask = await res.json();
            if (!res.ok) throw new Error(newTask.error || "Add failed");
            
            // If the new task is high or medium priority, add it to our list
            if (newTask.priority.toLowerCase() === 'high' || newTask.priority.toLowerCase() === 'medium') {
                setTasks(prevTasks => {
                    const updatedTasks = [
                        { 
                            id: newTask._id,
                            title: newTask.title,
                            completed: newTask.completed,
                            dueTime: newTask.startTime,
                            priority: newTask.priority.toLowerCase()
                        },
                        ...prevTasks
                    ].slice(0, 4); // Keep only the first 4 tasks
                    return updatedTasks;
                });
            }
        } catch (err) {
            console.error(err);
            alert(err.message);
        }
    };

    const handleModalSubmit = (task) => {
        handleAddTask(task);
        closeModal();
    };

    const handleDelete = async (id) => {
        // Not needed for adding tasks, but required for the modal component
    };
    
    if (loading) {
        return (
            <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-sm">
                <div className="flex items-center justify-between p-6 border-b border-[#e2e8f0]">
                    <h2 className="text-lg font-semibold text-[#0f172a]">Priority Tasks</h2>
                </div>
                <div className="p-6 text-center">
                    <p className="text-[#64748b]">Loading tasks...</p>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-sm">
                <div className="flex items-center justify-between p-6 border-b border-[#e2e8f0]">
                    <h2 className="text-lg font-semibold text-[#0f172a]">Priority Tasks</h2>
                </div>
                <div className="p-6 text-center">
                    <p className="text-red-500">Error: {error}</p>
                </div>
            </div>
        );
    }

    return (
        <div className="bg-white border border-[#e2e8f0] rounded-lg shadow-sm">
            <div className="flex items-center justify-between p-6 border-b border-[#e2e8f0]">
                <h2 className="text-lg font-semibold text-[#0f172a]">Priority Tasks</h2>
                <Link
                    to="/tasks"
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
                    <button
                        onClick={openAddModal}
                        className="flex items-center justify-center w-full py-3 border border-dashed border-[#cbd5e1] rounded-md text-sm text-[#64748b] hover:border-[#07b0ed] hover:text-[#07b0ed] transition-colors"
                    >
                        <Plus className="w-4 h-4 mr-1" /> Add New Task
                    </button>
                </div>
            </div>
            
            {/* Task Modal */}
            <TaskModal
                isOpen={isModalOpen}
                onClose={closeModal}
                onSubmit={handleModalSubmit}
                data={editData}
                onDelete={handleDelete}
            />
        </div>
    );
}
