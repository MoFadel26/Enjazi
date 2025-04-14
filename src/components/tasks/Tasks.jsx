import React, { useState } from "react";
import TaskItem from "./TaskItem";
import TaskList from "./TaskList";
import TaskModel from "./EditAddTask";
import View from "./Views";
import Categories from "./Categories";
import TopBar from "./TopBar";

const listOfTasks = [];

// ----------------------- Helper Functions -----------------------

// Function helps us to accept date string and convert it into localized
function formatDate(dateString) {
  if (!dateString) return "";
  const dateObject = new Date(dateString);
  return dateObject.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Function returns today's date as a STRING --> yyyy-mm-dd
function getTodayString() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2,"0");
  const year = today.getFullYear();
  const day = String(today.getDate()).padStart(2, "00");
  return `${year}-${month}-${day}`;
}

// Function for comparing a task's due date with today's date to check if the task is scheduled in the future.
function checkIsUpcoming(date) {
  const today = new Date(getTodayString());
  const taskDate = new Date(date);
  return taskDate > today;
}

// ----------------------- Main Function -----------------------

function Tasks() {
  // ### Main States
  
  // Set initial state (list of tasks)
  const [tasks, setTasks] = useState(listOfTasks);
  
  // Set initial state (Selected View, Priority and Category)
  const [selectedView, setSelectedView] = useState("all");
  const [selectedPriority, setSelectedPriority] = useState("All");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  // Set initial state ()
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editDate, setEditData] = useState(null);

  // For mobile sidebar
  const [mobileSidebarOpen, setMobileSidebarOpen] = useState(false);

  // ### Operations

  // After adding a task
  const handleAddTask = (task) => {
    const newTask = {
      id: Date.now(), ...task, completed: false
      }; setTasks((prev) => [newTask, ...prev])
  };

  // After Editting a task
  const handleEditTask = (updateTask) => {
    setTasks((prev) => prev.map((task) => (task.id === updateTask.id ? updateTask : task)));
  };
  
  // After entering check button (completed)
  const handleToggleComplete = (taskId) => {
    setTasks((prev) => prev.map((task) => (taskId === task.id ? {...task, completed: !task.completed} : task)));
  };

  // Model Handlers

  const openEditModel = (task) => {
    setEditData(task);
    setIsModalOpen(true);
  }
  
  const openAddModal = () => {
    setEditData(null);
    setIsModalOpen(true);
  }

  const closeModal = () => {
    setIsModalOpen(false);
  }

  const handleModelSubmit = (task) => {
    if (editDate) handleEditTask(task);
    else handleAddTask(task);
    closeModal();
  }

  // Filtering
  const filterTasks = () => {
    let filtered = [...tasks];
    if (selectedView === "today") {
      const todayStr = getTodayString();
      filtered = filtered.filter((task) => task.dueDate === todayStr);
    } else if (selectedView === "upcoming") {
      filtered = filtered.filter((task) => checkIsUpcoming(task.dueDate));
    } else if (selectedView === "completed") {
      filtered = filtered.filter((task) => task.completed);
    }
    if (selectedPriority !== "All") {
      filtered = filtered.filter((task) => task.priority === selectedPriority);
    }
    if (selectedCategory !== "All") {
      filtered = filtered.filter((task) => task.category === selectedCategory);
    }
    if (fromDate) {
      filtered = filtered.filter((task) => task.dueDate >= fromDate);
    }
    if (toDate) {
      filtered = filtered.filter((task) => task.dueDate <= toDate);
    }
    if (searchTerm.trim()) {
      const lower = searchTerm.toLowerCase();
      filtered = filtered.filter(
        (task) =>
          task.title.toLowerCase().includes(lower) ||
        task.description.toLowerCase().includes(lower)
      );
    }
    return filtered;
  };

  const filteredTasks = filterTasks();

  return (
    <div>

    </div>
  );

}

export default Tasks;