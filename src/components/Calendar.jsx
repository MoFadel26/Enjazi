import React, { useState } from "react";
import BuildMatrix from "./BuildMatrix";
import { Link } from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import ViewDay from "./ViewDay";
import ViewWeek from "./ViewWeek";
import ViewMonth from "./ViewMonth";

import {
  format,
} from 'date-fns';

// This function used for building the header of the calendar
function Header({currentDate, onToday, onPrevious, onNext, view, setView}) {
  const monthLabel = format(currentDate, 'MMMM yyyy') // month year
  return (
    <div className="flex justify-between mb-4 mt-4 items-center">
      {/* Left side: Month Label, Today and Previous/Next */}
      <div>
        <h1>{monthLabel}</h1>
        
        {/* Today Button */}
        <button>

        </button>

        {/* Previous */}
        <button>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10.0002 11.9999L6 7.99971L10.0025 3.99719"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
          </svg>
        </button>
        {/* Next */}
        <button>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M6.00236 3.99707L10.0025 7.99723L6 11.9998"
                stroke="currentColor"
                strokeWidth="1.3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
          </svg>
        </button>
      </div>
      
      {/* Right Side: toggles [day, week, month]*/}
      <div>
        {['Day', 'Week', 'Month'].map((mode) => (
          <button key={mode} onClick={setView(mode)} className={`hover:big-white px-5 py-2 font-medium transition ${
              view === mode ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-600'}`}>
          </button>
        )
      )}
      </div>
    </div>
  );
}
function Calendar() {
  const [currentDate, setCurrnetDate] = useState(new Date());
  const [view, setView] = useState('month') // initially, the calendar view will be by month
  
  const [tasks] = useState([]); // Getting all tasks from the user

  const handleTodayButton = () => {
    setCurrnetDate(new Date());
  }

  const handleNext = () => {

  }

  const handlePrevious = () => {
    
  }

  return (
    <div className="relative py-8 sm:p-8">
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-14">
        <div className="">
          <h5></h5>
        </div>
      </div>
    </div>
  );
}

export default Calendar;