import React from "react";
import formatDate from "./Tasks";
import {CalendarIcon, CheckIcon, renderCategoryIcon, renderPriority} from "./Icons"
export function TaskItem({task, onToggleComplete, onOpenEdit}) {
  const handleClick = () => {
    onToggleComplete(task.id);
  };
  return (
    <div>
      <div className="flex items-start border-b last:border-b-0 space-x-3 py-4">
        {/*Button Check if complete the task + Custom check icon*/}
        <button className="focus:outline-none mt-1 mb-1">
          <CheckIcon isCompleted={task.completed} />
        </button>

        <div>
          {/*Task Title*/}
          <h3 className={`mb-1 font-medium text-base ${task.completed ? "text-gray-400 line-through" : "text-gray-700"}`}>
            {task.title}
          </h3>

          {/*Task Description*/}
          <p className={`text-sm mb-1 ${task.completed ? "text-gray-300" : "text-gray-500"}`}>
            {task.description}
          </p>
        </div>
        <div className="flex flex-wrap gap-4 items-center text-xs">
          <span className="gap-2 flex items-center text-gray-400">
            <CalendarIcon></CalendarIcon>
            {formatDate(task.dueDate)}
          </span>

          {/*Task Icons (Priority & Category)*/}
          <span className="flex items-center text-gray-400 gap-2">
            {renderCategoryIcon(task.category)}
            {task.category}
          </span>
          {renderPriority(task.priority)}
        </div>
      </div>
      
      {/* Button for editing*/}
      <button
        className="px-1 text-sm text-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-300 hover:underline"
        onClick={() => onOpenEdit(task)}
      >
        Edit
      </button>
    </div>
  );
}