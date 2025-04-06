import React, { useState } from "react";
import ViewDay from "./Calendar/ViewDay";
import ViewWeek from "./Calendar/ViewWeek";
import ViewMonth from "./Calendar/ViewMonth";

import {
  format,
  addDays,
  subDays,
  addMonths,
  subMonths,
  addWeeks,
  subWeeks
} from 'date-fns';

// This function used for building the header of the calendar
function Header({currentDate, onToday, onPrevious, onNext, view, setView}) {
  const monthLabel = format(currentDate, 'MMMM yyyy') // month year
  return (
    <div className="flex justify-between mb-4 mt-4 items-center">
      {/* Left side: Month Label, Today and Previous/Next */}
      <div className="flex space-x-3 items-center">
        <h1 className="font-bold text-xl">{monthLabel}</h1>
        
        {/* Today Button */}
        <button onClick={onToday} className="inline-flex items-center px-3 py-1.5 border rounded text-sm hover:bg-gray-40 font-medium bg-white">
          Today
        </button>

        {/* Previous */}
        <button onClick={onPrevious}>
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
        <button onClick={onNext}>
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
      <div className="">
        {['Day', 'Week', 'Month'].map((mode) => (
          <button key={mode} onClick={setView(mode)} className={`hover:big-white px-5 py-2 font-medium transition ${
              view === mode ? 'bg-white text-gray-900' : 'bg-gray-100 text-gray-600'}`}>
                {mode}
          </button>
        )
      )}
      </div>
    </div>
  );
}
function Calendar() {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [view, setView] = useState('month') // initially, the calendar view will be by month
  
  const [tasks] = useState([]); // Getting all tasks from the user

  const handleTodayButton = () => {
    setCurrentDate(new Date());
  }

  const handleNext = () => {
    if (view === 'month') {
      setCurrentDate(addMonths(currentDate, 1));
    } else if (view === 'week') {
      setCurrentDate(addWeeks(currentDate, 1));
    } else {
      // day view
      setCurrentDate(addDays(currentDate, 1));
    }
  }

  const handlePrev = () => {
    if (view === 'month') {
      setCurrentDate(subMonths(currentDate, 1));
    } else if (view === 'week') {
      setCurrentDate(subWeeks(currentDate, 1));
    } else {
      setCurrentDate(subDays(currentDate, 1));
    }
  };

  return (

    <div className="relative py-8 sm:p-8">
      <Header
        currentDate={currentDate}
        onToday={handleTodayButton}
        onPrev={handlePrev}
        onNext={handleNext}
        view={view}
        setView={setView}
      />
      <div className="w-full max-w-7xl mx-auto px-4 lg:px-8 xl:px-14">
        {view === 'month' && (
          <ViewMonth currentDate={currentDate} events={tasks} />
        )}
        {view === 'week' && (
          <ViewWeek currentDate={currentDate} events={tasks} />
        )}
        {view === 'day' && (
          <ViewDay currentDate={currentDate} events={tasks} />
        )}
      </div>
    </div>
  );
}

export default Calendar;