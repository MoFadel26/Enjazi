import React from "react";
import {
  LowPriorityIcon,
  MedPriorityIcon,
  HighPriorityIcon,
} from "./Icons";

import {Calendar, Clock, CheckCircle, ArrowRight, Plus, CodeXml, ListFilter} from "lucide-react";

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
    <div className=" mt-4 ml-4 lg:block w-64 bg-white border rounded-md ">
      <div className="px-4 py-4 ">
        {/* Views */}
        <h2 className="text-md mb-4 font-bold">Views</h2>
        <div className="-mx-4 mb-3 mt-3">
          <hr className="border-t border-[#e2e8f0]" />
        </div>
        <ul className="mb-5 text-gray-600 text-sm space-y-2">
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left
              ${
                selectedView === "all"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedView("all")}
          >
            <ListFilter className="w-4 h-4"/>
            All Tasks
          </li>
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left
              ${
                selectedView === "today"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedView("today")}
          >
            <Calendar className="w-4 h-4"/>
            Today
          </li>
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left
              ${
                selectedView === "upcoming"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedView("upcoming")}
          >
            <Clock className="w-4 h-4" />
            Upcoming
          </li>
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left
              ${
                selectedView === "completed"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedView("completed")}
          >
            <CheckCircle className="w-4 h-4" />
            Completed
          </li>

        </ul>
        <div className="-mx-4 mb-3 mt-3">
          <hr className="border-t border-[#e2e8f0]" />
        </div>
        {/* Priority */}
        <h2 className="text-md mb-4 font-bold">Priority</h2>
        <div className="-mx-4 mb-3 mt-3">
          <hr className="border-t border-[#e2e8f0]" />
        </div>
        <ul className="mb-5 text-gray-600 text-sm space-y-2">
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left
              ${
                selectedPriority === "High"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedPriority("High")}
          >
            <HighPriorityIcon />
            High Priority
          </li>
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left
              ${
                selectedPriority === "Medium"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedPriority("Medium")}
          >
            <MedPriorityIcon />
            Medium Priority
          </li>
          <li
            className={`
              flex items-center px-2 py-2 gap-2 rounded-md transition-colors w-full text-left
              ${
                selectedPriority === "Low"
                  ? "bg-[#f0f9ff] text-[#07b0ed]"
                  : "text-[#64748b] hover:bg-[#f8fafc] hover:text-[#0f172a]"
              }
            `}
            onClick={() => setSelectedPriority("Low")}
          >
            <LowPriorityIcon />
            Low Priority
          </li>
        </ul>

        <div className="-mx-4 mb-3 mt-3">
          <hr className="border-t border-[#e2e8f0]" />
        </div>

          {/* Date Range */}
          <h2 className="text-md mb-4 font-bold">Date Range</h2>

          <div className="-mx-4 mb-3 mt-3">
            <hr className="border-t border-[#e2e8f0]" />
          </div>

          <div className="flex flex-col text-sm text-gray-600 mb-6 text-sm gap-3">
            <div className="flex items-center gap-2 justify-between">
              <label className="font-medium text-sm text-[#64748b]">From: </label>
              <input
                type="date"
                placeholder="mm/dd/yyyy"
                className="border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-400 focus:outline-none"
                value={fromDate}
                onChange={(e) => setFromDate(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 justify-between">
              <label className="font-medium text-sm text-[#64748b]">To: </label>
              <input
                type="date"
                placeholder="mm/dd/yyyy"
                className="border border-gray-300 rounded px-2 py-1 focus:ring-1 focus:ring-blue-400 focus:outline-none"
                value={toDate}
                onChange={(e) => setToDate(e.target.value)}
              />
            </div>
          </div>
      </div>
    </div>
  );
}

export default View;

