import React from "react";
import {Search, Plus} from "lucide-react"


function TopBar({ searchTerm, setSearchTerm, onOpenModal,}) {
  return (
    <div className="bg-white border-b border-[#e2e8f0] p-6">
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">

        <div className="flex items-center">
          <div>
            <h1 className="text-2xl font-bold text-[#0f172a]">Tasks</h1>
          </div>

        </div>
        <div className="flex items-center gap-2">
          <div className="relative flex-1 md:w-64">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <Search className="w-4 h-4 text-[#94a3b8]" />
            </div>
            <input
              type="text"
              className="bg-[#f8fafc] border border-[#e2e8f0] text-[#0f172a] text-sm rounded-md focus:ring-[#07b0ed] focus:border-[#07b0ed] block w-full pl-10 p-2.5"
              placeholder="Search tasks..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div>
            <button
              onClick={onOpenModal}
              className="flex items-center gap-1 bg-[#07b0ed] hover:bg-[#07b0ed]/90 text-white px-4 py-2.5 rounded-md text-sm font-medium transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span className="hidden md:inline">New Task</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default TopBar;