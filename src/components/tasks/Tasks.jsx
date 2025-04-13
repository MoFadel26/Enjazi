import React from "react";

const listOfTasks = [];

// ----------------------- Helper Functions -----------------------

// Function helps us to accept date string and convert it into localized
function formatDate(dateString) {
  if (!dateString) return "";
  const dateObject = new Date(dateString);
  return dateObject.toLocaleDateString(undefined, {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

// Function returns today's date as a STRING --> yyyy-mm-dd
function getTodayString() {
  const today = new Date();
  const month = String(today.getMonth() + 1).padStart(2,"0");
  const year = today.getFullYear();
  const day = String(today.getDate()).padStart(2, "00");
  return `${year}-${month}-${day}`;
}

// Function for comparing a task's due date with today's date to check if the task is scheduled in the future.
function checkIssUpcoming(date) {
  const today = new Date(getTodayString());
  const taskDate = new Date(date);
  return taskDate > today;
}

// ----------------------- Main Function -----------------------

export function Tasks() {
  return (
    <div>
        
    </div>
  );
}
