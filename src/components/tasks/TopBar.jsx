import React from "react";
import {
  SearchIcon,
  SideViewIconMobile
} from "./Icons";


function TopBar({ searchTerm, setSearchTerm, onOpenModal, onToggleMobileSidebar }) {
  return (
    <div className="bg-white border-b px-6 py-3 flex flex-col md:flex-row md:items-center md:justify-between">
      <div className="flex items-center">
        {/* Mobile Hamburger: visible only on small screens */}
        <button onClick={onToggleMobileSidebar} className="mr-4 md:hidden focus:outline-none">
          <SideViewIconMobile />
        </button>
        <div>
          <h1 className="text-2xl font-semibold text-gray-700">Tasks</h1>
          <p className="text-sm text-gray-400">Manage and organize your tasks</p>
        </div>
      </div>

      <div className="mt-3 md:mt-0 flex items-center space-x-3">
        <div className="relative">
          <input
            type="text"
            className="border border-gray-300 rounded-md pl-9 pr-3 py-2 text-sm focus:outline-none text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Search tasks..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <SearchIcon />
        </div>
        <button
          onClick={onOpenModal}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-offset-1"
        >
          + New Task
        </button>
      </div>
    </div>
  );
}

export default TopBar;