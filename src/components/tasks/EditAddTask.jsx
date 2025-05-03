import React from "react";
import { useState, useEffect } from "react";
import { getTodayString } from "./Tasks";
import {  
  X,
} from "lucide-react";

export function TaskModal({data, onSubmit, isOpen, onClose, onDelete }) {
  const [title, setTitle] = useState(data?.title ||  "");
  const [description, setDescription] = useState(data?.description || "");
  const [category, setCategory] = useState(data?.category || "Work");
  const [priority, setPriority] = useState(data?.priority || "Medium");
  const [dueDate, setDueDate] = useState(data?.dueDate || getTodayString());

  const [startTime, setStartTime] = useState(
    data ? data.startTime : "09:00"
  );
  const [endTime, setEndTime] = useState(
    data ? data.endTime : "10:00"
  );

  const handleSubmit = (e) => {
    e.preventDefault();
  
    if (!title.trim()) return;
  
    // Parse "HH:mm" strings into minutes since midnight
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const startTotal = startH * 60 + startM;
    const endTotal = endH * 60 + endM;
  
    if (startTotal >= endTotal) {
      alert("Start time must be before end time.");
      return;
    }
  
    // Valid – proceed with submission
    onSubmit({
      ...data,
      title,
      description,
      priority,
      category,
      dueDate,
      startTime,
      endTime,
    });
  };

  useEffect(() => {
    if (isOpen) {
      setTitle(data?.title || "");
      setDescription(data?.description || "");
      setCategory(data?.category || "Work");
      setPriority(data?.priority || "Medium");
      setDueDate(data?.dueDate || getTodayString());
      setStartTime(data?.startTime || '09:00');
      setEndTime(data?.endTime || '10:00');
    }
  }, [isOpen, data]);

  if (!isOpen) return null;
  
  return (
    <div className="bg-black flex items-center justify-center bg-opacity-30 fixed inset-0 backdrop-blur-sm z-50 transition-opacity">
      <div className="bg-white max-w-md rounded-lg shadow-lg">
        <div  className="relative max-w-md mx-auto shadow-xl rounded-xl border-t-8">

          <header className="px-6 py-4 flex items-center justify-between">
            <h2 className="font-semibold text-lg truncate">{data ? "Edit Task" : "Create Task"}</h2>
            <button onClick={onClose} className="p-1 rounded-full hover:bg-slate-200 hover:bg-gray-400">
              <X className="w-4 h-4" />
            </button>
          </header>
          {/*Form*/}
          <form className="space-y-6 p-6" onSubmit={handleSubmit}>

            {/*Title of the task*/}
            <div className="flex flex-col gap-2">
              <lable className="text-sm font-medium text-gray">
                Title
              </lable>
              <input type="text" placeholder="Enter task title" value={title} onChange={(e) => setTitle(e.target.value)}
                className="rounded-md text-gray-700 text-sm block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              >
              </input>
            </div>
            
            {/* Priority and the category of the task*/}
            <div className="flex flex-col sm:flex-row gap-2 justify-between">
              {/*Priority of the task*/}
              <div className="w-full flex flex-col gap-2">
                <label className="text-sm font-medium text-gray">
                  Priority
                </label>
                <select value={priority} onChange={(e) => setPriority(e.target.value)}
                  className="rounded-md text-gray-700 text-sm block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
                >
                  <option value="High">High</option>
                  <option value="Medium">Medium</option>
                  <option value="Low">Low</option>
                </select>
              </div>
              {/*Category of the task*/}
              <div className="w-full flex flex-col gap-2">
                <label className="text-sm font-medium text-gray">
                  Category
                </label>
                <select value={category} onChange={(e) => setCategory(e.target.value)}
                  className="rounded-md text-gray-700 text-sm block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
                >
                  <option value="Work">Work</option>
                  <option value="Personal">Personal</option>
                  <option value="Health">Health</option>
                  <option value="Education">Education</option>
                  <option value="Code">Code</option>
                  <option value="Social">Social</option>
                </select>
              </div>
            </div>

        <div className="flex flex-col gap-2">
					<div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Date
            </label>
            <input
              type="date"
              required
              value={dueDate}
              onChange={(event) => setDueDate(event.target.value)}
              className="rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

            <div className="flex flex-col sm:flex-row gap-2">
              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  Start
                </label>
                <input
                  type="time"
                  required
                  value={startTime}
                  onChange={(event) => setStartTime(event.target.value)}
                  className="rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>

              <div className="flex flex-col gap-2">
                <label className="text-sm font-medium">
                  End
                </label>
                <input
                  type="time"
                  required
                  value={endTime}
                  onChange={(event) => setEndTime(event.target.value)}
                  className="rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Description
            </label>
            <textarea 
              value={description}
              onChange={(event) => setDescription(event.target.value)}
              placeholder="Description (optional)"
              className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              rows={3}
            />
          </div>

            {/*Add or Edit the task*/}
            <div className="flex justify-center space-x-3 pt-2">
              {data?.id && (
                <button
                  type="button"
                  onClick={() => onDelete(data.id)}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white
                            text-sm font-medium rounded-md focus:outline-none
                            focus:ring-2 focus:ring-red-400"
                >
                  Delete
                </button>
              )}

              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white
                          text-sm font-medium rounded-md focus:outline-none
                          focus:ring-2 focus:ring-blue-400"
              >
                {data?.id ? 'Update Task' : 'Add Task'}
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default TaskModal;