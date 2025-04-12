import React, { useState } from 'react';
import { format, isToday, isFuture } from 'date-fns';

export default function TasksPage() {
  // Initial list of tasks
  const [tasks, setTasks] = useState([
    {
      id: 1,
      title: 'Task 1',
      description: 'This is a description for task 1',
      date: new Date(2025, 2, 3, 10, 30),
      priority: 'High',
      category: 'Education',
      status: 'active',
    },
    {
      id: 2,
      title: 'Task 2',
      description: 'This is a description for task 2',
      date: new Date(2025, 3, 15, 4, 22),
      priority: 'Medium',
      category: 'Education',
      status: 'active',
    },
  ]);

  // Form state for new task
  const [newTaskTitle, setNewTaskTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [newPriority, setNewPriority] = useState('Low');
  const [newCategory, setNewCategory] = useState('Work');

  // Filters for views
  const [filterView, setFilterView] = useState('all');

  // Add new task to list
  const handleAddTask = () => {
    const newTask = {
      id: Date.now(),
      title: newTaskTitle,
      description: newDescription,
      date: new Date(),
      priority: newPriority,
      category: newCategory,
      status: 'active',
    };
    setTasks([...tasks, newTask]);
    setNewTaskTitle('');
    setNewDescription('');
    setNewPriority('Low');
    setNewCategory('Work');
  };

  // Remove a task by ID
  const handleRemoveTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  // Set drag start index
  const handleDragStart = (e, index) => {
    e.dataTransfer.setData('dragIndex', index);
  };

  // Reorder task list on drop
  const handleDrop = (e, dropIndex) => {
    const dragIndex = e.dataTransfer.getData('dragIndex');
    const updatedTasks = [...tasks];
    const draggedItem = updatedTasks.splice(dragIndex, 1)[0];
    updatedTasks.splice(dropIndex, 0, draggedItem);
    setTasks(updatedTasks);
  };

  // Update task field inline (title, priority, category)
  const handleUpdateTask = (id, field, value) => {
    setTasks(tasks.map((task) => (task.id === id ? { ...task, [field]: value } : task)));
  };

  // Filter tasks based on selected view
  const getFilteredTasks = () => {
    if (filterView === 'today') {
      return tasks.filter((task) => isToday(task.date));
    } else if (filterView === 'upcoming') {
      return tasks.filter((task) => isFuture(task.date));
    } else if (filterView === 'completed') {
      return tasks.filter((task) => task.status === 'completed');
    }
    return tasks;
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar filters */}
      <aside className="w-72 bg-white border-r p-6 space-y-8">
        {/* View options */}
        <div>
          <h2 className="text-xl font-bold mb-4">Views</h2>
          <ul className="text-sm space-y-2 text-gray-700">
            <li className={`flex items-center gap-2 cursor-pointer ${filterView === 'all' ? 'text-blue-600 font-medium' : ''}`} onClick={() => setFilterView('all')}><span>📝</span> All Tasks</li>
            <li className={`flex items-center gap-2 cursor-pointer ${filterView === 'today' ? 'text-blue-600 font-medium' : ''}`} onClick={() => setFilterView('today')}><span>📅</span> Today</li>
            <li className={`flex items-center gap-2 cursor-pointer ${filterView === 'upcoming' ? 'text-blue-600 font-medium' : ''}`} onClick={() => setFilterView('upcoming')}><span>📈</span> Upcoming</li>
            <li className={`flex items-center gap-2 cursor-pointer ${filterView === 'completed' ? 'text-blue-600 font-medium' : ''}`} onClick={() => setFilterView('completed')}><span>✅</span> Completed</li>
          </ul>
        </div>
      </aside>

      {/* Main Task Section */}
      <main className="flex-1 p-6">
        {/* Add Task Form */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 space-y-4 md:space-y-0">
          <div>
            <h1 className="text-2xl font-bold mb-1">Tasks</h1>
            <p className="text-gray-500">Manage and organize your tasks</p>
          </div>

          <div className="flex flex-col md:flex-row items-start md:items-center space-y-2 md:space-y-0 md:space-x-2">
            <input type="text" placeholder="Task title..." className="border border-gray-300 rounded px-3 py-1.5" value={newTaskTitle} onChange={(e) => setNewTaskTitle(e.target.value)} />
            <input type="text" placeholder="Description..." className="border border-gray-300 rounded px-3 py-1.5" value={newDescription} onChange={(e) => setNewDescription(e.target.value)} />
            <select className="border border-gray-300 rounded px-3 py-1.5" value={newPriority} onChange={(e) => setNewPriority(e.target.value)}>
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
            <select className="border border-gray-300 rounded px-3 py-1.5" value={newCategory} onChange={(e) => setNewCategory(e.target.value)}>
              <option value="Work">Work</option>
              <option value="Personal">Personal</option>
              <option value="Health">Health</option>
              <option value="Education">Education</option>
            </select>
            <button onClick={handleAddTask} className="py-2 px-4 bg-blue-600 text-white rounded hover:bg-blue-700">+ Add Task</button>
          </div>
        </div>

        {/* Task list */}
        <div className="bg-white rounded-md shadow p-4">
          <h2 className="text-xl font-semibold text-gray-800 mb-4">
            All Tasks ({getFilteredTasks().length})
          </h2>
          <ul className="space-y-3">
            {getFilteredTasks().map((task, index) => (
              <li
                key={task.id}
                draggable
                onDragStart={(e) => handleDragStart(e, index)}
                onDragOver={(e) => e.preventDefault()}
                onDrop={(e) => handleDrop(e, index)}
                className="p-4 border rounded hover:bg-gray-50 transition cursor-move"
              >
                <div className="flex items-center justify-between">
                  <input
                    className="text-sm font-medium text-gray-800 bg-transparent border-b border-dashed focus:outline-none focus:border-blue-500"
                    value={task.title}
                    onChange={(e) => handleUpdateTask(task.id, 'title', e.target.value)}
                  />
                  <select
                    value={task.priority}
                    onChange={(e) => handleUpdateTask(task.id, 'priority', e.target.value)}
                    className={`text-xs font-semibold px-2 py-1 rounded-full shadow ${
                      task.priority === 'High' ? 'bg-red-100 text-red-600' :
                      task.priority === 'Medium' ? 'bg-yellow-100 text-yellow-600' :
                      'bg-green-100 text-green-600'}
                  `}
                  >
                    <option value="High">High</option>
                    <option value="Medium">Medium</option>
                    <option value="Low">Low</option>
                  </select>
                </div>
                <textarea
                  className="text-sm text-gray-500 mt-1 w-full bg-transparent border-b border-dashed focus:outline-none focus:border-blue-400"
                  value={task.description}
                  onChange={(e) => handleUpdateTask(task.id, 'description', e.target.value)}
                />
                <div className="mt-2 text-xs flex items-center space-x-3 text-gray-400">
                  <span>{format(task.date, 'MMM d, yyyy')} &middot; {format(task.date, 'h:mm aa')}</span>
                  <select
                    value={task.category}
                    onChange={(e) => handleUpdateTask(task.id, 'category', e.target.value)}
                    className="text-xs bg-transparent text-gray-500 border-b border-dashed focus:outline-none focus:border-blue-500"
                  >
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Health">Health</option>
                    <option value="Education">Education</option>
                  </select>
                </div>
                <button
                  onClick={() => handleRemoveTask(task.id)}
                  className="text-xs text-red-600 hover:underline mt-2"
                >
                  Delete
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </div>
  );
}

