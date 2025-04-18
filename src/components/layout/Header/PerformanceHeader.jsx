import React, { useState } from 'react';
import { CalendarDays, Download, ChevronDown } from 'lucide-react';
import { Button } from 'components/layout/Buttons/button';

export default function PerformanceHeader() {
  const [selectedRange, setSelectedRange] = useState('Last 7 Days');
  const [showDropdown, setShowDropdown] = useState(false);
  const options = ['Last 7 Days', 'Last 14 Days', 'Last 30 Days'];

  return (
    <div className="bg-white rounded-2xl shadow-md px-6 py-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 relative">
      {/* Title and subtitle */}
      <div>
        <h1 className="text-2xl font-bold text-gray-900">Performance</h1>
        <p className="text-sm text-muted-foreground">
          Track your study habits, task completion, and compare with friends.
        </p>
      </div>

      {/* Controls */}
      <div className="flex items-center gap-2 relative">
        {/* Dropdown */}
        <div className="relative">
          <button
            onClick={() => setShowDropdown(!showDropdown)}
            className="flex items-center gap-2 text-sm border rounded-md px-3 py-2 bg-white shadow-sm hover:bg-gray-50"
          >
            <CalendarDays className="w-4 h-4 text-muted-foreground" />
            {selectedRange}
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>

          {showDropdown && (
            <div className="absolute right-0 mt-2 w-40 bg-white border border-gray-200 rounded-md shadow-lg z-10">
              {options.map((option) => (
                <div
                  key={option}
                  onClick={() => {
                    setSelectedRange(option);
                    setShowDropdown(false);
                  }}
                  className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                >
                  {option}
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Export button */}
        <button
          className="flex items-center gap-2 text-sm border rounded-md px-3 py-2 bg-white shadow-sm hover:bg-gray-50"
          onClick={() => alert('Export triggered!')} // Replace with actual logic
        >
          <Download className="w-4 h-4 text-muted-foreground" />
          Export
        </button>
      </div>
    </div>
  );
}
