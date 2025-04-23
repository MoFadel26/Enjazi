// Import main files
import React from "react";

import {
  format,
  subMonths,
  startOfMonth,
  endOfMonth,
  eachDayOfInterval,
  isSameMonth,
  isSameDay,
  
} from "date-fns";

import {useState} from "react";
import {useEffect} from "react";
import { useRef } from "react";

// Import Icons
import {  
  Plus,
  Book,
	ChevronLeft,
  ChevronRight,
  Dumbbell,
  House,
  Briefcase,
  CodeXml,
  Coffee,
  ListFilter,
  X,
} from "lucide-react";


// List of Tasks (initial tasks for trying)
const listOfTasks = [
  {
    id: 1,
    title: "Task 1",
    description: "This is a description for Task 1",
    priority: "High",
    category: "Education",
    dueDate: "2025-04-03",
    startTime: "09:00",
    endTime: "10:00",
    completed: true,
  },
  {
    id: 2,
    title: "Task 2",
    description: "This is a description for Task 2",
    priority: "Medium",
    category: "Personal",
    dueDate: "2025-04-12",
    startTime: "09:00",
    endTime: "10:00",
    completed: false,
  },
  {
    id: 3,
    title: "Task 3",
    description: "This is a description for Task 3",
    priority: "Medium",
    category: "Education",
    dueDate: "2025-04-15",
    startTime: "09:00",
    endTime: "10:00",
    completed: false,
  },
];

// List of Events (initial events for trying)
const listOfEvents = [
  {
    id: "1",
    title: "Team Meeting",
    priority: "High",
    description: "Discuss Q2 goals",
    startTime: new Date(2025, 3, 2, 10, 0),
    endTime: new Date(2025, 3, 2, 11, 0),
    colour: "purple",
  },
  {
    id: "2",
    title: "Product Demo",
    priority: "Medium",
    description: "Show feature set",
    startTime: new Date(2025, 3, 7, 9, 30),
    endTime: new Date(2025, 3, 7, 10, 30),
    colour: "blue",
  },
];


// Category Icons setup

const categoryIcons = {
  Education: { icon: Book, colour: "blue" },
  Personal: { icon: House, colour: "purple" },
  Social: { icon: Coffee, colour: "yellow" },
  Fitness: { icon: Dumbbell, colour: "green" },
  Work: { icon: Briefcase, colour: "red" },
  Coding: { icon: CodeXml, colour: "orange" },
  Misc: { icon: ListFilter, colour: "orange" },
};

const priorityColours = {
  Low: "green",
  Medium: "yellow",
  High: "red",
};

// Color styles used for containers
const colourStyles = {
  purple: "bg-purple-50 text-purple-600 border border-purple-300",
  blue: "bg-blue-50 text-blue-600 border border-blue-300",
  green: "bg-green-50 text-green-600 border border-green-300",
  yellow: "bg-yellow-50 text-yellow-600 border border-yellow-300",
  orange: "bg-orange-50 text-orange-600 border border-orange-300",
  red: "bg-red-50 text-red-600 border border-red-300",
  pink:   "bg-pink-50   text-pink-600   border border-pink-300",
  gray:   "bg-gray-50   text-gray-600   border border-gray-300",
  indigo: "bg-indigo-50 text-indigo-600 border border-indigo-300",
  teal:   "bg-teal-50   text-teal-600   border border-teal-300",
};

// Colour Options
const colourOptions = Object.keys(colourStyles).map((key) => ({
	value: key,
	label: key.charAt(0).toUpperCase() + key.slice(1)
}));

// Dots (Proiorites):

const Dot = ({ className = '' }) => (
  <span className={`inline-block w-2 h-2 rounded-full mr-1 ${className}`} />
);

const LowPriorityIcon   = () => <Dot className="bg-green-500" />;
const MedPriorityIcon   = () => <Dot className="bg-yellow-500" />;
const HighPriorityIcon  = () => <Dot className="bg-red-500" />;

export const renderPriority = (priorityType) => {
  if (priorityType === 'Low')    return <LowPriorityIcon />;
  if (priorityType === 'Medium') return <MedPriorityIcon />;
  if (priorityType === 'High')   return <HighPriorityIcon />;
  return null;
};


// Helper Functions (Utiliies):
function startofWeek(date) {
	const tempDate = new Date(date);
	const day = tempDate.getDay();
	tempDate.setDate(tempDate.getDate() - day);
	return tempDate;
}

function addDays(date, n) {
	const tempDate = new Date(date);
	tempDate.setDate(tempDate.getDate() + n);
	return tempDate;
}

// Convert from Task to Event to display it into calendar
function taskToEvent (task) {
	const icon = categoryIcons[task.category] || {};

  const startTime = new Date(`${task.dueDate}T${task.startTime || "09:00"}:00`);
  const endTime = new Date(`${task.dueDate}T${task.endTime || "10:00"}:00`);

	// Return the Event
  return {
    id: `task-${task.id}`,
    title: task.title,
    description: task.description,
    priority: task.priority,
    startTime,
    endTime,
    colour: icon.colour || priorityColours[task.priority],
    icon: icon.icon,
    isTask: true,
    completed: task.completed,
  };
}


function EventForm ({event,  onSave, onDelete, onCancel}) {
	const [title, setTitle]= useState(event?.title || "");
	const [description, setDiscription] = useState(event?.description || "");
  const [priority, setPriority] = useState(event?.priority || "Low");
	const [colour, setColour] = useState(event?.colour || priorityColours[priority]);

	// States for dates and times
  const [date, setDate] = useState(
    event ? format(event.startTime, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd")
  );
  const [startTime, setStartTime] = useState(
    event ? format(event.startTime, "HH:mm") : "09:00"
  );
  const [endTime, setEndTime] = useState(
    event ? format(event.endTime, "HH:mm") : "10:00"
  );

	useEffect (() => {
		if (!event) {
			setColour(priorityColours[priority]);
		}
	}, [priority, event]);

  function handleSubmit(ev) {
    ev.preventDefault();
  
    const [startH, startM] = startTime.split(":").map(Number);
    const [endH, endM] = endTime.split(":").map(Number);
    const [year, month, day] = date.split("-").map(Number);
  
    const start = new Date(year, month - 1, day, startH, startM);
    const end = new Date(year, month - 1, day, endH, endM);
  
    if (start >= end) {
      alert("Start time must be before end time.");
      return;
    }
  
    const newEvt = {
      id: event?.id,
      title,
      description,
      priority,
      startTime: start,
      endTime: end,
      colour,
    };
  
    onSave(newEvt);
  }
  
	function durationHours() {
    const [sh, sm] = startTime.split(":" ).map(Number);
    const [eh, em] = endTime.split(":" ).map(Number);
    const diff = eh * 60 + em - (sh * 60 + sm);
    return Math.max(diff / 60, 0);
	}

	return (
		<div  className="relative max-w-md mx-auto shadow-xl rounded-xl border-t-8">

      <header className="px-6 py-4 flex items-center justify-between">
        <h2 className="font-semibold text-lg truncate">{event ? "Edit Event" : "Create Event"}</h2>
        <button onClick={onCancel} className="p-1 rounded-full hover:bg-slate-200 hover:bg-gray-400">
          <X className="w-4 h-4" />
        </button>
      </header>
      
			<form className="space-y-4 p-6" onSubmit={handleSubmit}>
        <div className="grid gap-2">
          <labe className="text-sm font-medium"l>Title <span className="text-red-500">*</span></labe>
          <input
            required
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Event title"
            className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
          />
        </div>

        {/* Priority Selection */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">
            Priority
          </label>
          <div className="flex items-center gap-2">
            <select
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
              className="rounded-md text-gray-700 text-sm block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {Object.keys(priorityColours).map((p) => (
                <option key={p}>{p}</option>
              ))}
            </select>
          </div>
        </div>


        {/* Color Selection */}
        <div className="grid gap-2">
          <label className="text-sm font-medium">
            Color
          </label>
          <div className="flex items-center gap-2">
            <select
              value={colour}
              onChange={(e) => setColour(e.target.value)}
              className="rounded-md text-gray-700 text-sm block w-full px-3 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              {colourOptions.map(({ value, label }) => (
                <option key={value} value={value}>
                  {label}
                </option>
              ))}
            </select>
          </div>
        </div>

				<div className="flex flex-col gap-4">
					<div className="flex flex-col gap-2">
            <label className="text-sm font-medium">
              Date
            </label>
            <input
              type="date"
              required
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
            />
          </div>

          <div className="flex flex-col sm:flex-row gap-4 flex-1">
            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                Start
              </label>
              <input
                type="time"
                required
                value={startTime}
                onChange={(event) => setStartTime(event.target.value)}
                className="rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>

            <div className="flex flex-col gap-2">
              <label className="text-sm font-medium">
                End
              </label>
              <input
                type="time"
                required
                value={endTime}
                onChange={(event) => setEndTime(event.target.value)}
                className="rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>
				</div>

				<textarea 
					value={description}
					onChange={(event) => setDiscription(event.target.value)}
					placeholder="Description (optional)"
					className="w-full rounded-lg border border-slate-300 dark:border-slate-600 bg-transparent px-3 py-2 focus:outline-none focus:ring-2 focus:ring-primary-500"
					rows={3}
				/>

				<div className="flex space-x-2 justify-end">
					<button
						type="button"
						onClick={onCancel}
						className="px-4 py-2 border rounded"
					>
						Cancel
					</button>
					{event && (
						<button
							type="button"
							onClick={() => onDelete(event.id)}
							className="bg-red-500 px-4 py-2 text-white rounded"
						>
							Delete
						</button>
					)}
					<button
						type="submit"
						className="bg-blue-600 px-4 py-2 hover:bg-blue-700 text-white rounded"
					>
						Save
					</button>
				</div>
			</form>
		</div>
	);
}

function CalendarPage() {

	// Initial States
	const [view, setView] = useState("month");
	const [event, setEvent] = useState(listOfEvents);
	const [currentDate, setCurrentDate] = useState(new Date());
	const [modelOpen, setModalOpen] = useState(false);
	const [editEvent, setEditEvent] = useState(null);

	//  
	const hasSeedTasks = useRef(false);

	//
	useEffect(() => {
		if(!hasSeedTasks.current) {
			const taskEvents = listOfTasks.map(taskToEvent);
			setEvent((prev) => [...prev, ...taskEvents]);
			hasSeedTasks.current = true;
		}
	}, []);

	// *** Navigations ***

	// Going to previous day
	function goPrevious() {
		 if (view === 'month') {
		  setCurrentDate((date) => subMonths(date,1));
		 } else if (view === 'week') {
			setCurrentDate((date) => addDays(date, -7));
		 } else {
			setCurrentDate((date) => addDays(date, -1))
		 }
	}
	
	// Going next day
	function goNext () {
		if (view === 'month') {
		  setCurrentDate((date) => subMonths(date,-1));
		 } else if (view === 'week') {
			setCurrentDate((date) => addDays(date, 7));
		 } else {
			setCurrentDate((date) => addDays(date, 1))
		 }
	}

	// Going to current Date
	function goToday() {
		setCurrentDate(new Date());
	}

	// Getting month days *** Helper ***
  const getMonthDays = () =>
    eachDayOfInterval({
      start: startOfMonth(currentDate),
      end: endOfMonth(currentDate),
    });
  const eventsOn = (date) => event.filter((e) => isSameDay(e.startTime, date));

	//  ************** Controlling Models ************** 
	function closeModel() {
		setEditEvent(null);
		setModalOpen(false);
	}

	function openModel(tempEvent) {
		setEditEvent(tempEvent || null);
		setModalOpen(true);
	}

	function handleSave(tempEvent) {
		if (tempEvent.id) {
			setEvent((evts) => evts.map((evt) => (evt.id === tempEvent.id ? tempEvent : evt)));
		} else {
			tempEvent.id = Date.now().toString();
			setEvent((evts) => [...evts, tempEvent]);
		}
		closeModel();
	}

	function handleDelete(id) {
		setEvent((evts) => evts.filter((evt) => evt.id !== id));
		closeModel();
	}

	//  ************** View by Months ************** 
	function MonthView () {
		const days=getMonthDays();
		const blanks = Array.from({length: startOfMonth(currentDate).getDay()})
		return (
      <div className="hidden md:grid flex-1 grid-cols-7 auto-rows-[120px] border-t border-l border-gray-200 select-none">
        {/* weekday header */}
        {[
          "Sun",
          "Mon",
          "Tue",
          "Wed",
          "Thu",
          "Fri",
          "Sat",
        ].map((d) => (
          <div
            key={d}
            className="bg-white py-2 text-center text-sm font-medium text-gray-500 border-r border-b border-gray-200"
          >
            {d}
          </div>
        ))}
        {blanks.map((_, i) => (
          <div key={i} className="border-r border-b border-gray-200 bg-white" />
        ))}
        {days.map((day) => {
          const inMonth = isSameMonth(day, currentDate);
          const todaysEvents = eventsOn(day);
          const isToday = isSameDay(day, new Date());
          return (
            <div
              key={day.toISOString()}
              onClick={() => {
                setCurrentDate(day);
                setView("day");
              }}
              className={`p-1 overflow-hidden border-r border-b border-gray-200 bg-white cursor-pointer hover:bg-gray-50 ${
                inMonth ? "" : "opacity-50"
              }`}
            >
              <div className="flex items-center justify-between mb-0.5">
                <span
                  className={`text-xs font-semibold ${
                    isToday ? "text-purple-600" : ""
                  }`}
                >
                  {format(day, "d")}
                </span>
                {todaysEvents.length > 0 && (
                  <span className="ml-1 inline-block rounded-full bg-purple-600 text-white text-[10px] w-4 h-4 leading-4 text-center">
                    {todaysEvents.length}
                  </span>
                )}
              </div>
              <div className="space-y-0.5">
                {todaysEvents.slice(0, 3).map((ev) => {
                  const Icon = ev.icon;
                  return (
                    <div
                      key={ev.id}
                      onClick={(e) => {
                        e.stopPropagation();
                        openModel(ev);
                      }}
                      className={`truncate text-[11px] px-1.5 py-0.5 rounded flex items-center ${colourStyles[ev.colour] || ev.colour}`}
                    >
                      {Icon && <Icon className="w-3 h-3 mr-0.5 opacity-80" />}
                      {renderPriority(ev.priority)}
                      <span className="flex-1 truncate">{ev.title}</span>
                      <span className="ml-1 opacity-60 whitespace-nowrap">{format(ev.startTime, "h:mm a")}</span>
                    </div>
                  );
                })}
                {todaysEvents.length > 3 && (<div className="text-[10px] italic text-gray-500">+{todaysEvents.length - 3} more</div>)}
              </div>
            </div>
          );
        })}
      </div>
		);
	}

	//  ************** View by Weeks **************
	function WeekView () {
    const startDay = startofWeek(currentDate);
    const days = Array.from({length:7}, (_,y) => addDays(startDay, y));
		const hours = Array.from({length:24}, (_,y) => y);
    const H = 56; // --> Cell Height
    return (
      <div className="hidden md:block flex-1 overflow-x-auto">
        <div
          className="min-w-[900px] grid grid-cols-[60px_repeat(7,1fr)]"
          style={{ height: "100%" }}
        >
          {/* header */}
          <div className="border-r border-b" />
          {days.map((d) => (
            <div
              key={d}
              className="border-b p-2 text-center font-medium sticky -top-px bg-white z-10"
            >
              {format(d, "EEE d")}
            </div>
          ))}
          {/* Hour - Rows */}
          {hours.map((hour) => (
            <React.Fragment key={hour}>
              {/* time */}
              <div
                className="border-r px-2 text-xs text-gray-500"
                style={{ height: H}}
              >
                {hour % 12 || 12} {hour < 12 ? "AM" : "PM"}
              </div>
              {/* Days - Columns */}
              {days.map((day) => {
                const ev = event.find((e) => e.startTime.getHours() === hour && isSameDay(e.startTime, day));
                const Icon = ev?.icon;
                return (
                  <div
                    key={`${day}-${hour}`}
                    className="relative border-t"
                    style={{ height: H }}
                  >
                    {ev && (
                      <div
                        onClick={(e) => {
                          e.stopPropagation();
                          openModel(ev);
                        }}
                        className={`absolute left-1 right-1 top-[1px] p-1 rounded text-xs cursor-pointer flex items-center space-x-1 ${
                          colourStyles[ev.colour] || ev.colour
                        }`}
                        style={{height:((ev.endTime - ev.startTime) / (1000 * 60 * 60)) * H -2,}}
                      >
                        {Icon && <Icon className="w-3 h-3" />}
                        {renderPriority(ev.priority)}
                        <span className="truncate">{ev.title}</span>
                      </div>
                    )}
                  </div>
                );
              })}
            </React.Fragment>
          ))}
        </div>
      </div>

		);
	}

	//  ************** View by Days **************
	function TodayView () {
    const hours = Array.from({ length: 24 }, (_, i) => i);
    const H = 56; // --> Cell Height
    const todaysEvents = eventsOn(currentDate);

    return (
      <div className="flex-1 overflow-x-auto">
        {/* header */}
        <div className="sticky top-0 z-20 bg-white p-4 border-b flex items-center justify-between">
          <h3 className="text-lg font-semibold">
            {format(currentDate, "EEEE, MMM d")}
          </h3>
        </div>
        {/* Timeline - Grid*/}
        <div
          className="min-w-[400px] grid grid-cols-[60px_1fr]"
          style={{ height: "calc(100% - 56px)" }}
        >
          <div>
            {hours.map((hour) => (
              <div
                key={hour}
                className="border-t px-2 text-xs text-gray-500"
                style={{ height: H }}
              >
                {hour % 12 || 12} {hour < 12 ? "AM" : "PM"}
              </div>
            ))}
          </div>
          {/* event canvas */}
          <div className="relative">
            {hours.map((_, i) => (
              <div
                key={i}
                className="border-t absolute left-0 right-0"
                style={{ top: i * H, height: 0 }}
              />
            ))}
            {todaysEvents.map((tempEvent) => {
              const Icon = tempEvent.icon;
              const sh = tempEvent.startTime.getHours();
              const sm = tempEvent.startTime.getMinutes();
              const duration = (tempEvent.endTime - tempEvent.startTime) / 3600000; // hrs
              return (
                <div
                  key={tempEvent.id}
                  onClick={(e) => {
                    e.stopPropagation();
                    openModel(tempEvent);
                  }}
                  className={`absolute left-2 right-2 p-2 rounded shadow text-sm cursor-pointer flex items-start space-x-1 ${
                    colourStyles[tempEvent.colour] || tempEvent.colour
                  }`}
                  style={{
                    top: sh * H + (sm / 60) * H,
                    height: duration * H - 4,
                  }}
                >
                  {Icon && <Icon className="w-4 h-4" />}
                  {renderPriority(tempEvent.priority)}
                  <div className="flex-1">
                    <div className="font-medium leading-tight truncate">
                      {tempEvent.title}
                    </div>
                    <div className="text-xs opacity-70">
                      {format(tempEvent.startTime, "h:mm a")} – {format(tempEvent.endTime, "h:mm a")}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
	}

	//  ************** Mobile View (Mobile Month) **************
	function MobileView () {
    const days = getMonthDays();
    return (
      <div className="md:hidden space-y-4 flex-1">
        <div className="flex items-center justify-between px-4">
          <button onClick={goPrevious}>
            <ChevronLeft />
          </button>
          <button
            onClick={goToday}
            className="px-3 py-1 bg-gray-100 rounded text-sm"
          >
            Today
          </button>
          <button onClick={goNext}>
            <ChevronRight />
          </button>
        </div>
        <div className="px-4 font-semibold text-lg">
          {format(currentDate, "LLLL yyyy")}
        </div>
        <div className="grid grid-cols-7 text-center text-xs text-gray-500 px-4">
          {["S", "M", "T", "W", "T", "F", "S"].map((d) => (
            <div key={d}>{d}</div>
          ))}
        </div>
        <div className="grid grid-cols-7 gap-1 px-4">
          {days.map((day) => {
            const cnt = eventsOn(day).length;
            const selected = isSameDay(day, currentDate);
            return (
              <div
                key={day}
                onClick={() => {
                  setCurrentDate(day);
                  setView("day");
                }}
                className="h-10 flex flex-col items-center justify-center cursor-pointer"
              >
                <div
                  className={`w-8 h-8 leading-8 text-center rounded-full text-sm ${
                    selected
                      ? "bg-purple-600 text-white"
                      : "text-gray-700 hover:bg-gray-100"
                  }`}
                >
                  {format(day, "d")}
                </div>
                {cnt > 0 && (
                  <div className="mt-0.5 flex space-x-0.5">
                    {[...Array(Math.min(cnt, 3))].map((_, i) => (
                      <span
                        key={i}
                        className="w-1.5 h-1.5 bg-gray-700 rounded-full"
                      />
                    ))}
                    {cnt > 3 && (
                      <span className="text-[9px] text-gray-500">
                        +{cnt - 3}
                      </span>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
        {/* daily list */}
        <div className="px-4 space-y-2">
          <div className="font-medium">
            Events on {format(currentDate, "MMM d, yyyy")}
          </div>
          {eventsOn(currentDate).map((tempEvent) => {
            const Icon = tempEvent.icon;
            return (
              <div
                key={tempEvent.id}
                onClick={() => openModel(tempEvent)}
                className={`p-2 text-sm rounded cursor-pointer flex items-center space-x-1 ${
                  colourStyles[tempEvent.colour] || tempEvent.colour
                }`}
              >
                {Icon && <Icon className="w-3 h-3" />}
                {renderPriority(tempEvent.priority)}
                <span className="truncate flex-1">{tempEvent.title}</span>
                <span className="ml-2 text-xs opacity-70">
                  {format(tempEvent.startTime, "h:mm a")}
                </span>
              </div>
            );
          })}
          {eventsOn(currentDate).length === 0 && (
            <div className="text-sm text-gray-500 italic">No events</div>
          )}
        </div>
      </div>
		);
	}

  return (
    <div className="flex flex-col h-screen bg-gray-50 overflow-auto border rounded">
      <div className="flex flex-col flex-1 max-w-7xl w-full mx-auto bg-white shadow">
        {/* header of Calendar*/}
        <div className="flex justify-between items-center border-b shrink-0 bg-white sticky top-0 px-4 z-30 md:px-6 py-3 border-b">
          {/* Left Side */}
          <div className="md:flex items-center hidden space-x-3">
            <button className="p-2 hover:bg-gray-100 rounded-full" onClick={goPrevious}>
              <ChevronLeft className="w-5 h-5"></ChevronLeft>
            </button>
            <button className="px-3 py-1 rounded bg-gray-100" onClick={goToday}>
              Today
            </button>
            <button className="p-2 hover:bg-gray-100 rounded-full" onClick={goNext}>
              <ChevronRight className="w-5 h-5"></ChevronRight>
            </button>
            <h2 className="ml-4 text-lg font-semibold">
              {format(currentDate, "MMMM yyyy")}
            </h2>
          </div>
          
          {/* Right Side */}
          <div className="flex items-center space-x-2">
            {/* Switch (View) */}
            <div className="hidden md:flex space-x-2">
              {
                [
                  {value: "month", label: "Month"},
                  {value: "week", label: "Week"},
                  {value: "day", label: "Day"}
                ].map(({value, label}) => (
                  <button 
                    key={value} onClick={()=>setView(value)} 
                    className={`px-3 py-1 rounded-md text-sm transition ${view === value ? "bg-red-100 text-red-700" : "text-gray-600 hover:bg-gray-100"}`}
                  >{label}</button>
                ))
              }
            </div>

            {/* Add Event */}
            <button
              onClick={() => openModel()}
              className="hidden md:flex items-center px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-sm rounded-md"
            >
            <Plus className="w-4 h-4 mr-1" /> Add event
            </button>
          </div>
        </div>
        {/* Body of Calendar*/}
        <div>
          <div className="flex flex-col flex-1">
            {/* Large Screens */}

            {view === 'month' && <MonthView></MonthView>}
            {view === 'week' && <WeekView></WeekView>}
            {view === 'day' && <TodayView></TodayView>}
            {/* Small Screens */}
            {view !== 'week' && <MobileView></MobileView>}
          </div>
        </div>
      </div>

      {/* Open Model*/}
      {modelOpen && (
        <div className="bg-black flex items-center justify-center bg-opacity-30 fixed inset-0 backdrop-blur-sm z-50 transition-opacity">
          <div className="bg-white max-w-md rounded-lg shadow-lg">
            <EventForm
              event={editEvent}
              onSave={handleSave}
              onDelete={handleDelete}
              onCancel={closeModel}
            />
          </div>
        </div>
      )}
		</div>
	);
}

export default CalendarPage;