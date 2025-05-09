import React, { useState, useEffect } from "react";
import TaskList from "./TaskList";
import TaskModal from "./EditAddTask";
import View from "./Views";
import TopBar from "./TopBar";
import Categories from "./Categories";
import Sidebar from "components/layout/sidebar/Sidebar";


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
  const year  = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day   = String(today.getDate()).padStart(2, "0");
  return `${year}-${month}-${day}`;
}

// turn any date‐string or Date into "YYYY-MM-DD"
function toYMD(date) {
  const d = new Date(date);
  const year  = d.getFullYear();
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const day   = String(d.getDate()).padStart(2, "0");
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
  const [tasks,   setTasks]   = useState([]);   // fetched from API
  const [loading, setLoading] = useState(true);
  const [error,   setError]   = useState(null);

  
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

  useEffect(() => {
    const ac = new AbortController();          // abort on unmount
  
    (async () => {
      try {
        const res = await fetch(
          'http://localhost:5000/api/users/me',
          {
            method: 'GET',                     // explicit but optional
            credentials: 'include',            // send the cookie / token
            signal: ac.signal                  // for cleanup
          }
        );
  
        const data = await res.json();
        if (!res.ok) throw new Error(data.error || 'Could not load tasks');
  
        const tasks = Array.isArray(data.tasks) ? data.tasks : [];
        const normalized = tasks.map(t => ({ ...t, id: t._id })).reverse();
        setTasks(normalized);
      } catch (err) {
        if (err.name !== 'AbortError') setError(err.message);
      } finally {
        setLoading(false);
      }
    })();
  
    return () => ac.abort();                   // cleanup
  }, []);
  

  // ### Operations

  // After adding a task
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
      setTasks(t => [{ ...newTask, id: newTask._id }, ...t]);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // After Editting a task
  const handleEditTask = async (task) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/tasks/${task.id}`,
        {
          method: "PATCH",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(task)
        }
      );
      const updated = await res.json();
      if (!res.ok) throw new Error(updated.error || "Update failed");
      setTasks(t => t.map(x => (x.id === task.id ? { ...updated, id: updated._id } : x)));
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
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

  // DELETE
  const handleDelete = async (id) => {
    if (!window.confirm("Really delete this task?")) return;
    try {
      const res = await fetch(`http://localhost:5000/api/tasks/${id}`, {
        method: "DELETE",
        credentials: "include",
      });
      if (!res.ok) {
        const payload = await res.json();
        throw new Error(payload.error || "Delete failed");
      }
      setTasks(t => t.filter(x => x.id !== id));
      closeModal();
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  // Filtering
  const filterTasks = () => {
    let filtered = [...tasks];
    if (selectedView === "today") {
      const todayStr = getTodayString();
      filtered = filtered.filter(task =>
        task.dueDate && toYMD(task.dueDate) === todayStr
      );
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

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-slate-500">Loading tasks…</p>
      </div>
    );
  }
  if (error) {
    return (
      <div className="flex h-screen items-center justify-center">
        <p className="text-red-600">Error: {error}</p>
      </div>
    );
  }

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
            {/* Desktop sidebar */}
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
              onDelete={handleDelete}
            />
          </div>
        </div>

        </main>
      </div>
    </div>


  );

}

export default Tasks;