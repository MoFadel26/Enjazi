import React from "react";
import {
  AllTasksIcon,
  TodayIcon,
  UpcomingIcon,
  CompletedIcon,
  LowPriorityIcon,
  MedPriorityIcon,
  HighPriorityIcon,
} from "./Icons";

export function View({
  selectedView,
  setSelectedView,
  selectedPriority,
  setSelectedPriority,
  fromDate,
  setFromDate,
  toDate,
  setToDate
}) {
  return (
    <aside className="lg:block w-64 bg-white border">
        <div className="px-6 py-6">
        {/* Views */}
        <h2 className="text-sm mb-4 font-bold text-gray-400">Views</h2>
        <ul className="mb-5 text-gray-600 text-sm space-y-2ou">
          <li
            className={`flex items-center font-medium curser-pointer${
              selectedView === "today" ? "text-blue-600 font-medium bg-[#f0f9ff] text-[#07b0ed]" : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
            } hover:text-blue-500 font-medium`}
            onClick={() => setSelectedView("today")}
          >
            <AllTasksIcon />
            All Tasks
          </li>
          <li
            className={`flex items-center font-medium curser-pointer${
              selectedView === "upcoming" ? "text-blue-600 font-medium bg-[#f0f9ff] text-[#07b0ed]" : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
            } hover:text-blue-500 font-medium`}
            onClick={() => setSelectedView("upcoming")}
          >
            <TodayIcon />
            Today
          </li>
          <li
            className={`flex items-center font-medium curser-pointer${
              selectedView === "upcoming" ? "text-blue-600 font-medium bg-[#f0f9ff] text-[#07b0ed]" : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
            } hover:text-blue-500 font-medium`}
            onClick={() => setSelectedView("upcoming")}
          >
            <UpcomingIcon />
            Upcoming
          </li>
          <li
            className={`flex items-center font-medium curser-pointer${
              selectedView === "completed" ? "text-blue-600 font-medium bg-[#f0f9ff] text-[#07b0ed]" : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
            } hover:text-blue-500 font-medium`}
            onClick={() => setSelectedView("completed")}
          >
            <CompletedIcon />
            Completed
          </li>

          {/* Priority */}
          <h2 className="text-sm mb-4 font-bold text-gray-400">Priority</h2>
          <li
            className={`flex items-center font-medium curser-pointer${
              selectedPriority === "High" ? "text-blue-600 font-medium bg-[#f0f9ff] text-[#07b0ed]" : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
            } hover:text-blue-500 font-medium`}
            onClick={() => setSelectedPriority("High")}
          >
            <HighPriorityIcon />
            High Priority
          </li>
          <li
            className={`flex items-center font-medium curser-pointer${
              selectedPriority === "Medium" ? "text-blue-600 font-medium bg-[#f0f9ff] text-[#07b0ed]" : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
            } hover:text-blue-500 font-medium`}
            onClick={() => setSelectedPriority("Medium")}
          >
            <MedPriorityIcon />
            Medium Priority
          </li>
          <li
            className={`flex items-center font-medium curser-pointer${
              selectedPriority === "Low" ? "text-blue-600 font-medium bg-[#f0f9ff] text-[#07b0ed]" : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
            } hover:text-blue-500 font-medium`}
            onClick={() => setSelectedPriority("Low")}
          >
            <LowPriorityIcon />
            Low Priority
          </li>

          {/* Date Range */}
          <h2 className="text-sm mb-4 font-bold text-gray-400">Date Range</h2>
          
          <div className="flex flex-col text-sm text-gray-600 mb-6 text-sm">
            <input
              type="date"
              placeholder="mm/dd/yyyy"
              className="border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-400 focus:outline-none"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
            <input
              type="date"
              placeholder="mm/dd/yyyy"
              className="border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-400 focus:outline-none"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
        </ul>
      </div>
    </aside>
  );
}