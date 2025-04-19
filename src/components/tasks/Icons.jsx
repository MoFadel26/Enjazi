import React from "react";

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

export function WorkIcon () {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10.6663 13.3335V2.66683C10.6663 2.31321 10.5259 1.97407 10.2758 1.72402C10.0258 1.47397 9.68663 1.3335 9.33301 1.3335H6.66634C6.31272 1.3335 5.97358 1.47397 5.72353 1.72402C5.47348 1.97407 5.33301 2.31321 5.33301 2.66683V13.3335" stroke="#3B82F6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M13.333 4H2.66634C1.92996 4 1.33301 4.59695 1.33301 5.33333V12C1.33301 12.7364 1.92996 13.3333 2.66634 13.3333H13.333C14.0694 13.3333 14.6663 12.7364 14.6663 12V5.33333C14.6663 4.59695 14.0694 4 13.333 4Z" stroke="#3B82F6" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export function PersonalIcon () {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M10 14V8.66667C10 8.48986 9.92976 8.32029 9.80474 8.19526C9.67971 8.07024 9.51014 8 9.33333 8H6.66667C6.48986 8 6.32029 8.07024 6.19526 8.19526C6.07024 8.32029 6 8.48986 6 8.66667V14" stroke="#A855F7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2 6.66648C1.99995 6.47253 2.04222 6.2809 2.12386 6.10496C2.20549 5.92902 2.32453 5.77301 2.47267 5.64782L7.13933 1.64848C7.37999 1.44509 7.6849 1.3335 8 1.3335C8.3151 1.3335 8.62001 1.44509 8.86067 1.64848L13.5273 5.64782C13.6755 5.77301 13.7945 5.92902 13.8761 6.10496C13.9578 6.2809 14 6.47253 14 6.66648V12.6665C14 13.0201 13.8595 13.3592 13.6095 13.6093C13.3594 13.8593 13.0203 13.9998 12.6667 13.9998H3.33333C2.97971 13.9998 2.64057 13.8593 2.39052 13.6093C2.14048 13.3592 2 13.0201 2 12.6665V6.66648Z" stroke="#A855F7" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export function HealthIcon () {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M9.60039 9.5999L6.40039 6.3999" stroke="#22C55E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M12.4383 14.3231C12.1882 14.5732 11.8491 14.7137 11.4955 14.7138C11.1419 14.7139 10.8027 14.5734 10.5526 14.3234C10.3025 14.0734 10.162 13.7343 10.1619 13.3807C10.1618 13.027 10.3022 12.6879 10.5523 12.4378L9.37426 13.6164C9.12416 13.8665 8.78495 14.007 8.43126 14.007C8.07757 14.007 7.73836 13.8665 7.48826 13.6164C7.23816 13.3663 7.09766 13.0271 7.09766 12.6734C7.09766 12.3197 7.23816 11.9805 7.48826 11.7304L11.7309 7.48777C11.981 7.23767 12.3202 7.09717 12.6739 7.09717C13.0276 7.09717 13.3668 7.23767 13.6169 7.48777C13.867 7.73787 14.0075 8.07708 14.0075 8.43077C14.0075 8.78446 13.867 9.12367 13.6169 9.37377L12.4383 10.5518C12.6884 10.3018 13.0275 10.1613 13.3812 10.1614C13.7348 10.1615 14.0739 10.302 14.3239 10.5521C14.5739 10.8022 14.7144 11.1414 14.7143 11.495C14.7142 11.8486 14.5737 12.1878 14.3236 12.4378L12.4383 14.3231Z" stroke="#22C55E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M14.3337 14.3332L13.4004 13.3999" stroke="#22C55E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M2.60033 2.59984L1.66699 1.6665" stroke="#22C55E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
      <path d="M4.2695 8.51217C4.0194 8.76227 3.68019 8.90277 3.3265 8.90277C2.97281 8.90277 2.6336 8.76227 2.3835 8.51217C2.1334 8.26207 1.9929 7.92286 1.9929 7.56917C1.9929 7.21547 2.1334 6.87627 2.3835 6.62617L3.56217 5.44817C3.43833 5.57196 3.29132 5.67015 3.12954 5.73713C2.96776 5.80411 2.79437 5.83857 2.61926 5.83853C2.26563 5.83847 1.92651 5.69793 1.6765 5.44783C1.55271 5.324 1.45452 5.17699 1.38754 5.01521C1.32056 4.85342 1.2861 4.68003 1.28613 4.50493C1.2862 4.1513 1.42673 3.81218 1.67683 3.56217L3.56217 1.67683C3.81218 1.42673 4.1513 1.2862 4.50493 1.28613C4.68003 1.2861 4.85342 1.32056 5.01521 1.38754C5.17699 1.45452 5.324 1.55271 5.44783 1.6765C5.57167 1.80029 5.66991 1.94727 5.73695 2.10902C5.80398 2.27078 5.8385 2.44416 5.83853 2.61926C5.83857 2.79437 5.80411 2.96776 5.73713 3.12954C5.67015 3.29132 5.57196 3.43833 5.44817 3.56217L6.62617 2.3835C6.87627 2.1334 7.21547 1.9929 7.56917 1.9929C7.92286 1.9929 8.26207 2.1334 8.51217 2.3835C8.76227 2.6336 8.90277 2.97281 8.90277 3.3265C8.90277 3.68019 8.76227 4.0194 8.51217 4.2695L4.2695 8.51217Z" stroke="#22C55E" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
  );
}

export function EducationIcon () {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M2.66699 13.0002V3.00016C2.66699 2.55814 2.84259 2.13421 3.15515 1.82165C3.46771 1.50909 3.89163 1.3335 4.33366 1.3335H12.667C12.8438 1.3335 13.0134 1.40373 13.1384 1.52876C13.2634 1.65378 13.3337 1.82335 13.3337 2.00016V14.0002C13.3337 14.177 13.2634 14.3465 13.1384 14.4716C13.0134 14.5966 12.8438 14.6668 12.667 14.6668H4.33366C3.89163 14.6668 3.46771 14.4912 3.15515 14.1787C2.84259 13.8661 2.66699 13.4422 2.66699 13.0002ZM2.66699 13.0002C2.66699 12.5581 2.84259 12.1342 3.15515 11.8217C3.46771 11.5091 3.89163 11.3335 4.33366 11.3335H13.3337" stroke="#F59E0B" stroke-width="1.33333" stroke-linecap="round" stroke-linejoin="round"/>
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
      return <WorkIcon />
  } else if (category==="Personal") {
      return <PersonalIcon />
  } else if (category==="Health") {
      return <HealthIcon />
  } else if (category==="Education") {
      return <EducationIcon />
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