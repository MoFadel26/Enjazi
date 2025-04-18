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

function CalendarPage() {
  return (
		<div>

		</div>
	);
}

export default CalendarPage;
