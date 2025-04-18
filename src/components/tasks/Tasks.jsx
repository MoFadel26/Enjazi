import React, { useState } from "react";
import TaskList from "./TaskList";
import TaskModal from "./EditAddTask";
import View from "./Views";
import TopBar from "./TopBar";
import Categories from "./Categories";
import Sidebar from "components/layout/Sidebar/Sidebar";


const listOfTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "This is a description for Task 1",
    priority: "High",
    category: "Education",
    dueDate: "2025-04-03",
    startTime: "09:00",
    endTime: "10:00",
    completed: true,
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is a description for Task 2",
    priority: "Medium",
    category: "Personal",
    dueDate: "2025-04-12",
    startTime: "09:00",
    endTime: "10:00",
    completed: false,
  },
  {
    id: 3,
    title: "Task 3",
    description: "This is a description for Task 3",
    priority: "Medium",
    category: "Education",
    dueDate: "2025-04-15",
    startTime: "09:00",
    endTime: "10:00",
    completed: false,
  },
];

// ----------------------- Helper Functions -----------------------

// Function helps us to accept date string and convert it into localized
export function formatDate(dateString) {
  if (!dateString) return "";
  const dateObject = new Date(dateString);
  return dateObject.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Function returns today's date as a STRING --> yyyy-mm-dd
export function getTodayString() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2,"0");
  const year = today.getFullYear();
  const day = String(today.getDate()).padStart(2, "00");
  return `${year}-${month}-${day}`;
}

// Function for comparing a task's due date with today's date to check if the task is scheduled in the future.
export function checkIsUpcoming(date) {
  const today = new Date(getTodayString());
  const taskDate = new Date(date);
  return taskDate > today;
}

// ----------------------- Main Function -----------------------

export function Tasks() {
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
  const [editData, setEditData] = useState(null);

  // ### Operations

  // After adding a task
  const handleAddTask = (task) => {
    const newTask = {
      id: Date.now(), ...task, completed: false
      }; setTasks((prev) => [newTask, ...prev]);
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

  const openEditModal = (task) => {
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

  const handleModalSubmit = (task) => {
    if (editData) {handleEditTask(task);}
    else {handleAddTask(task);}
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
    <div className="flex h-screen">
      <Sidebar />

      <div className="flex flex-col flex-1 overflow-hidden">
        {/* Top Bar with mobile hamburger toggle */}
        <div className="">
          <TopBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            onOpenModal={openAddModal}
          />
        </div>
        {/* <div className="-mx-4 mb-3 mt-4">
          <hr className="border-t border-[#e2e8f0]" />
        </div> */}
        <main className="p-4 overflow-auto">

        <div className="flex flex-col w-full min-h-screen bg-[#f8fafc] font-inter">
          <div className="flex-1 flex w-full flex-wrap sm:mx-auto md:mx-auto lg:mx-0">
            {/* Desktop Sidebar */}
            <div>
              <View
                selectedView={selectedView}
                setSelectedView={setSelectedView}
                selectedPriority={selectedPriority}
                setSelectedPriority={setSelectedPriority}
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
                fromDate={fromDate}
                setFromDate={setFromDate}
                toDate={toDate}
                setToDate={setToDate}
              />

              <Categories
                selectedCategory={selectedCategory}
                setSelectedCategory={setSelectedCategory}
              />
            </div>

            {/* Main Task List */}
            <div className="flex-1 p-4 w-full">
              <TaskList
                tasks={filteredTasks}
                filteredView={selectedView}
                onToggleComplete={handleToggleComplete}
                onOpenEditModal={openEditModal}
              />
            </div>
          </div>

          {/* Task Modal */}
          <div>
            <TaskModal
              isOpen={isModalOpen}
              onClose={closeModal}
              onSubmit={handleModalSubmit}
              data={editData}
            />
          </div>
        </div>

        </main>
      </div>
    </div>


  );

}

export default Tasks;