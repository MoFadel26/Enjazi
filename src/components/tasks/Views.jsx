import React from "react";
import {
  SearchIcon,
  CheckIcon,
  AllTasksIcon,
  TodayIcon,
  UpcomingIcon,
  CompletedIcon,
  LowPriorityIcon,
  MedPriorityIcon,
  HighPriorityIcon,
  WorkIcon,
  PersonalIcon,
  HealthIcon,
  EducationIcon,
  CalendarIcon,
  renderCategoryIcon,
  renderPriority
} from "./Icons";

import {useState, useEffect} from "react";

function View({
  selectedView,
  setSelectedView,
  selectedPriority,
  setSelectedPriority,
  selectedCategory,
  setSelectedCategory,
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
              selectedView === "all" ? "text-blue-600 font-medium bg-[#f0f9ff] text-[#07b0ed]" : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
            } hover:text-blue-500 font-medium`}
            onClick={() => setSelectedView("all")}
          >
            <AllTasksIcon />
            All Tasks
          </li>
          <li
            className={`flex items-center font-medium curser-pointer${
              selectedView === "all" ? "text-blue-600 font-medium bg-[#f0f9ff] text-[#07b0ed]" : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
            } hover:text-blue-500 font-medium`}
            onClick={() => setSelectedView("all")}
          >
            <TodayIcon />
            Today
          </li>
          <li
            className={`flex items-center font-medium curser-pointer${
              selectedView === "all" ? "text-blue-600 font-medium bg-[#f0f9ff] text-[#07b0ed]" : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
            } hover:text-blue-500 font-medium`}
            onClick={() => setSelectedView("all")}
          >
            <UpcomingIcon />
            Upcoming
          </li>
          <li
            className={`flex items-center font-medium curser-pointer${
              selectedView === "all" ? "text-blue-600 font-medium bg-[#f0f9ff] text-[#07b0ed]" : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
            } hover:text-blue-500 font-medium`}
            onClick={() => setSelectedView("all")}
          >
            <CompletedIcon />
            Completed
          </li>
        </ul>
      </div>
    </aside>
  );
}