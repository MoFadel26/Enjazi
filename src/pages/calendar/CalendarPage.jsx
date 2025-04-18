// Import main files
import React from "react";

import {
  format,
  addMonths,
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
  Search,
	ChevronLeft,
  ChevronRight,
  Dumbbell,
  House,
  Briefcase,
  CodeXml,
  Coffee,
  ListFilter,
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
    start: new Date(2025, 3, 2, 10, 0),
    end: new Date(2025, 3, 2, 11, 0),
    colour: "purple",
  },
  {
    id: "2",
    title: "Product Demo",
    priority: "Medium",
    description: "Show feature set",
    start: new Date(2025, 3, 7, 9, 30),
    end: new Date(2025, 3, 7, 10, 30),
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
function dot(className) {
	return (<span className={`inline-block w-2 h-2 rounded-full mr-1 ${className}`}/>);
}

function LowPriorityIcon() {
	return (
		<dot className="bg-green-500" />
	);
}

function MedPriorityIcon() {
	return (
		<dot className="bg-yellow-500" />
	);
}

function HighPriorityIcon() {
	return (
		<dot className="bg-red-500" />
	);
}


export function renderPriority(priorityType) {
  if (priorityType === "Low") {
    return (
      <span className="inline-flex items-center text-xs font-semibold">
        <LowPriorityIcon />
      </span>
    );
  } else if (priorityType === "Medium") {
    return (
      <span className="inline-flex items-center text-xs font-semibold">
        <MedPriorityIcon />
      </span>
    );
  } else if (priorityType === "High") {
    return (
      <span className="inline-flex items-center text-xs font-semibold">
        <HighPriorityIcon />
      </span>
    );
  }
  return null;
}

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

  const start = new Date(`${task.dueDate}T${task.startTime || "09:00"}:00`);
  const end = new Date(`${task.dueDate}T${task.endTime || "10:00"}:00`);

	// Return the Event
  return {
    id: `task-${task.id}`,
    title: task.title,
    description: task.description,
    priority: task.priority,
    start,
    end,
    colour: icon.colour || priorityColours[task.priority],
    icon: icon.icon,
    isTask: true,
    completed: task.completed,
  };
}


function EventForm ({event,  onSave, onDelete, onCancel}) {
	const [title, setTitle]= useState(event?. title || "");
	const [description, setDiscription] = useState(event?.description || "");
  const [priority, setPriority] = useState(event?.priority || "Low");
	const [colour, setColour] = useState(event?.colour || priorityColours[priority]);

	// States for dates and times
  const [date, setDate] = useState(
    event ? format(event.start, "yyyy-MM-dd") : format(new Date(), "yyyy-MM-dd")
  );
  const [startTime, setStartTime] = useState(
    event ? format(event.start, "HH:mm") : "09:00"
  );
  const [endTime, setEndTime] = useState(
    event ? format(event.end, "HH:mm") : "10:00"
  );

	useEffect (() => {
		if (!event) {
			setColour(priorityColours[priority]);
		}
	}, [priority, event]);

	function handleSubmit(ev) {
		ev.preventDefault();
		const [startH, startM] = startTime.split(":" ).map(Number);
    const [endH, endM] = endTime.split(":" ).map(Number);
    const [year, month, day] = date.split("-").map(Number);

    const newEvt = {
      id: event?.id,
      title,
      description,
      priority,
      start: new Date(year, month - 1, day, startH, startM),
      end: new Date(year, month - 1, day, endH, endM),
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
		<div>
			<form className="space-4" onSubmit={handleSubmit}>
				<input
					required
					value={title}
					onChange={(e) => setTitle(e.target.value)}
					placeholder="Event title"
					className="w-full p-2 border rounded"
				/>

				<div className="flex space-x-2 items-center">
					<label className="text-sm font-medium w-24">Priority</label>
					<select
						value={priority}
						onChange={(event) => setPriority(event.target.value)}
						className="flex-1 p-2 border rounded"
					>
						{Object.keys(priorityColours).map((priority) => (
							<option key={priority}>{priority}</option>
						))}
					</select>
					{renderPriority(priority)}
				</div>

				<div className="flex space-x-2">
					<input
						type="date"
						required
						value={date}
						onChange={(event) => setDate(event.target.value)}
						className="flex-1 p-2 border rounded"
					/>
					<input
						type="time"
						required
						value={startTime}
						onChange={(event) => setStartTime(event.target.value)}
						className="w-24 p-2 border rounded"
					/>
					<input
						type="time"
						required
						value={endTime}
						onChange={(event) => setEndTime(event.target.value)}
						className="w-24 p-2 border rounded"
					/>
				</div>
				<textarea 
					value={description}
					onChange={(event) => setDiscription(event.target.value)}
					placeholder="Description (optional)"
					className="w-full p-3 border rounded"
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
		  setCurrentDate((date) => subMonths(date,1));
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
  const eventsOn = (date) => event.filter((e) => isSameDay(e.start, date));

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
		return (
			<div>

			</div>
		);
	}

	//  ************** View by Weeks **************
	function WeekView () {
		return (
			<div>

			</div>
		);
	}

	//  ************** View by Days **************
	function TodayView () {
		return (
			<div>

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
          {eventsOn(currentDate).map((ev) => {
            const Icon = ev.icon;
            return (
              <div
                key={ev.id}
                onClick={() => openModel(ev)}
                className={`p-2 text-sm rounded cursor-pointer flex items-center space-x-1 ${
                  colourStyles[ev.colour] || ev.colour
                }`}
              >
                {Icon && <Icon className="w-3 h-3" />}
                {renderPriority(ev.priority)}
                <span className="truncate flex-1">{ev.title}</span>
                <span className="ml-2 text-xs opacity-70">
                  {format(ev.start, "h:mm a")}
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
		<div>

		</div>
	);
}

export default CalendarPage;
