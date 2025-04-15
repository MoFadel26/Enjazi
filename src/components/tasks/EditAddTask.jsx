import React from "react";
import { useState, useEffect } from "react";
import getTodayString from "./Tasks";

export function TaskModel({data, onSubmit, isOpen, onClose}) {
  const [title, setTitle] = useState(data?.title ||  "");
  const [description, setDescription] = useState(data?.description || "");
  const [category, setCategory] = useState(data?.category || "Work");
  const [priority, setPriority] = useState(data?.priority || "Medium");
  const [dueDate, setDueDate] = useState(data?.dueDate || getTodayString());
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please provide a task title!");
      return;
    }
    onSubmit({
      ...data,
      title,
      description,
      priority,
      category,
      dueDate,
    });
  };

  useEffect(() => {
    if (isOpen) {
      setTitle(data?.title || "");
      setDescription(data?.description || "");
      setCategory(data?.category || "Work");
      setPriority(data?.priority || "Medium");
      setDueDate(data?.dueDate || getTodayString());
    }
  }, [isOpen, data]);

  if (!isOpen) return null;
  
  return (
    <div className="bg-black flex items-center justify-center bg-opacity-30 fixed inset-0 backdrop-blur-sm z-50 transition-opacity">
      <div className="bg-white p-6 relative animate-fadeInUp w-11/12 max-w-md md:max-w-lg rounded-lg shadow-xl">
            
        {/*Close Button*/}
        <button
          className="text-gray-400 hover:text-gray text-2xl absolute top-3 right-3 focus:outline-none"
          onClick={onClose}
        >
          &times;
        </button>
        {/*Heading*/}
        <h2 className="text-gray text-xl font-bold mb-5">
          {data?.id ? "Edit Task" : "Add Task"}
        </h2>
        {/*Form*/}
        <form className="space-y-5" onSubmit={handleSubmit}>

          {/*Title of the task*/}
          <div>
            <lable className="text-sm font-medium text-gray mb-2">
              Title
            </lable>
            <input type="text" placeholder="Enter task title" value={title} onChange={(e) => setTitle(e.target.value)}
              className="rounded-md text-gray-700 text-sm block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
            </input>
          </div>

          {/*Description of the task*/}
          <div>
            <lable className="text-sm font-medium text-gray mb-2">
              Description
            </lable>
            <textarea type="text" placeholder="Enter task description" value={description} onChange={(e) => setDescription(e.target.value)}
              className="rounded-md text-gray-700 text-sm block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
            </textarea>
          </div>
          
          {/* Priority and the category of the task*/}
          <div>
            {/*Priority of the task*/}
            <div>
              <lable className="text-sm font-medium text-gray mb-2">
                Priority
              </lable>
              <select value={priority} onChange={(e) => setPriority(e.target.value)}
                className="rounded-md text-gray-700 text-sm block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
              >
                <option value="High">High</option>
                <option value="Medium">Medium</option>
                <option value="Low">Low</option>
              </select>
            </div>
            {/*Category of the task*/}
            <div>
              <lable className="text-sm font-medium text-gray mb-2">
                Category
              </lable>
              <select value={category} onChange={(e) => setCategory(e.target.value)}
                className="rounded-md text-gray-700 text-sm block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"  
              >
                <option value="Work">Work</option>
                <option value="Personal">Personal</option>
                <option value="Health">Health</option>
                <option value="Education">Education</option>
              </select>
            </div>
          </div>

          {/*Date Due of the task*/}
          <div>
            <lable className="text-sm font-medium text-gray mb-2">
              Description
            </lable>
            <input type="date" value={dueDate} onChange={(e) => setDueDate(e.target.value)}
              className="rounded-md text-gray-700 text-sm block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
            </input>
          </div>

          {/*Add or Edit the task*/}
          <div className="flex justify-end space-x-3 pt-2">
              <button
                type="button"
                className="px-4 py-2 text-sm bg-gray-200 text-gray-700 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400"
                onClick={onClose}
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white text-sm font-medium rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
              >
                {data?.id ? "Update Task" : "Add Task"}
              </button>
          </div>
        </form>
      </div>
    </div>
  );
}