import React from "react";
import {Book, Dumbbell , House, Briefcase, CodeXml, Coffee, ListFilter} from "lucide-react";

// ----------------------- ICONS -----------------------

export function SearchIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 4H14" stroke="#07B0ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.66699 8H11.3337" stroke="#07B0ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.66699 12H9.33366" stroke="#07B0ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

// Icon that toggles between completed and not completed tasks
export function CheckIcon({isCompleted}) {
  if (isCompleted) {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M18.1678 8.33357C18.5484 10.2013 18.2772 12.1431 17.3994 13.8351C16.5216 15.527 15.0902 16.8669 13.3441 17.6313C11.5979 18.3957 9.64252 18.5384 7.80391 18.0355C5.9653 17.5327 4.35465 16.4147 3.24056 14.8681C2.12646 13.3214 1.57626 11.4396 1.68171 9.53639C1.78717 7.63318 2.54189 5.82364 3.82004 4.40954C5.09818 2.99545 6.82248 2.06226 8.70538 1.76561C10.5883 1.46897 12.516 1.82679 14.167 2.7794" stroke="#07B0ED" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M7.5 9.16683L10 11.6668L18.3333 3.3335" stroke="#07B0ED" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
    );
  } else {
    return (
      <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
        <path d="M10.0003 18.3332C14.6027 18.3332 18.3337 14.6022 18.3337 9.99984C18.3337 5.39746 14.6027 1.6665 10.0003 1.6665C5.39795 1.6665 1.66699 5.39746 1.66699 9.99984C1.66699 14.6022 5.39795 18.3332 10.0003 18.3332Z" stroke="#CBD5E1" stroke-width="1.66667" stroke-linecap="round" stroke-linejoin="round"/>
      </svg>
      );
  }
}

export function AllTasksIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2 4H14" stroke="#07B0ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.66699 8H11.3337" stroke="#07B0ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6.66699 12H9.33366" stroke="#07B0ED" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export function TodayIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M5.33301 1.3335V4.00016" stroke="#64748B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M10.667 1.3335V4.00016" stroke="#64748B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.6667 2.6665H3.33333C2.59695 2.6665 2 3.26346 2 3.99984V13.3332C2 14.0696 2.59695 14.6665 3.33333 14.6665H12.6667C13.403 14.6665 14 14.0696 14 13.3332V3.99984C14 3.26346 13.403 2.6665 12.6667 2.6665Z" stroke="#64748B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2 6.6665H14" stroke="#64748B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export function UpcomingIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M7.99967 14.6668C11.6816 14.6668 14.6663 11.6821 14.6663 8.00016C14.6663 4.31826 11.6816 1.3335 7.99967 1.3335C4.31778 1.3335 1.33301 4.31826 1.33301 8.00016C1.33301 11.6821 4.31778 14.6668 7.99967 14.6668Z" stroke="#64748B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M8 4V8L10.6667 9.33333" stroke="#64748B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export function CompletedIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M14.5341 6.66666C14.8385 8.16086 14.6215 9.71428 13.9193 11.0679C13.2171 12.4214 12.072 13.4934 10.6751 14.1049C9.27816 14.7164 7.71382 14.8305 6.24293 14.4282C4.77205 14.026 3.48353 13.1316 2.59225 11.8943C1.70097 10.657 1.26081 9.15148 1.34518 7.62892C1.42954 6.10635 2.03332 4.65872 3.05583 3.52744C4.07835 2.39616 5.45779 1.64961 6.96411 1.4123C8.47043 1.17498 10.0126 1.46123 11.3334 2.22333" stroke="#64748B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M6 7.33317L8 9.33317L14.6667 2.6665" stroke="#64748B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export function LowPriorityIcon () {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="12" height="12" rx="6" fill="#60A5FA"/>
    </svg>

  );
}

export function MedPriorityIcon () {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="12" height="12" rx="6" fill="#FB923C"/>
    </svg>
  );
}

export function HighPriorityIcon () {
  return (
    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect width="12" height="12" rx="6" fill="#EF4444"/>
    </svg>
  );
}

export function CalendarIcon () {
  return (
    <svg
      className="w-4 h-4 mr-1 inline-block text-gray-400"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect>
      <line x1="16" y1="2" x2="16" y2="6"></line>
      <line x1="8" y1="2" x2="8" y2="6"></line>
      <line x1="3" y1="10" x2="21" y2="10"></line>
    </svg>
  );
}


// ----------------------- Render Category Functions -----------------------

export function renderCategoryIcon(category) {
  if (category==="Work") {
    return <Briefcase className="w-4 h-4 text-[#3366FF]" />
  } else if (category==="Personal") {
    return <House className="w-4 h-4 text-[#FF5EE7]" />
  } else if (category==="Health") {
    return <Dumbbell className="w-4 h-4 text-[#FF5E5E]" />
  } else if (category==="Education") {
    return <Book className="w-4 h-4 text-[#00B894]" />
  } else if (category==="Code") {
    return <CodeXml className="w-4 h-4 text-[#9B59B6]" />
  } else if (category==="Social") {
    return <Coffee className="w-4 h-4 text-[#FFB700]" />
  }
  else return null;
}

export function renderPriority(priorityType) {
  if (priorityType==="Low") {
    return (
      <span className="inline-flex items-center bg-green-100 text-green-600 text-xs font-semibold px-2 py-1 rounded-full gap-1">
        <LowPriorityIcon />
        Low
      </span>
    );
  } else if (priorityType==="Medium") {
    return (
      <span className="inline-flex items-center bg-yellow-100 text-yellow-600 text-xs font-semibold px-2 py-1 rounded-full gap-1">
        <MedPriorityIcon />
        Medium
      </span>
    );
  } else if (priorityType==="High") {
    return (
      <span className="inline-flex items-center bg-red-100 text-red-600 text-xs font-semibold px-2 py-1 rounded-full gap-1">
        <HighPriorityIcon />
        High
      </span>
    );
  }
  else return null;
}

// For mobile

export function SideViewIconMobile() {
  return (
    <svg
      className="w-6 h-6 text-gray-700"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      viewBox="0 0 24 24"
    >
      <path d="M4 6h16M4 12h16M4 18h16" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}