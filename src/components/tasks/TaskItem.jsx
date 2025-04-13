import React from "react";
import { useState, useEffect } from "react";
import formatDate from "./Tasks";

export function TaskItem({task, onToggleComplete, onOpenEdit}) {
  const handleClick = () => {
    onToggleComplete(task.id);
  };
  return (
    <div>

    </div>
  );
}