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

export function Categories({
  selectedCategory,
  setSelectedCategory,
}) {
  return (
    <aside className="lg:block w-64 bg-white border">
        <div className="px-6 py-6">
        {/* Views */}
        <h2 className="text-sm mb-4 font-bold text-gray-400">Views</h2>
        <ul className="mb-5 text-gray-600 text-sm space-y-2ou gap-3">
          <li
            className={`flex items-center gap-4 font-medium curser-pointer${
              selectedCategory === "Work" ? "text-blue-600 font-medium bg-[#f0f9ff] text-[#07b0ed]" : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
            } hover:text-blue-500 font-medium`}
            onClick={() => setSelectedCategory("Work")}
          >
            <WorkIcon />
            Work
          </li>
          <li
            className={`flex items-center font-medium curser-pointer${
              selectedCategory === "Personal" ? "text-blue-600 font-medium bg-[#f0f9ff] text-[#07b0ed]" : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
            } hover:text-blue-500 font-medium`}
            onClick={() => setSelectedCategory("Personal")}
          >
            <PersonalIcon />
            Personal
          </li>

          <li
            className={`flex items-center font-medium curser-pointer${
              selectedCategory === "Health" ? "text-blue-600 font-medium bg-[#f0f9ff] text-[#07b0ed]" : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
            } hover:text-blue-500 font-medium`}
            onClick={() => setSelectedCategory("Health")}
          >
            <HealthIcon />
            Health
          </li>
          <li
            className={`flex items-center font-medium curser-pointer${
              selectedCategory === "Education" ? "text-blue-600 font-medium bg-[#f0f9ff] text-[#07b0ed]" : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
            } hover:text-blue-500 font-medium`}
            onClick={() => setSelectedCategory("Education")}
          >
            <EducationIcon />
            Education
          </li>
        </ul>
      </div>
    </aside>
  );
}