import React from "react";
import { useState, useEffect } from "react";
import getTodayString from "./Tasks";

export function TaskModel({data, onSubmit, isOpen, onClose}) {
  const [title, setTitle] = useState(data?.title ||  "");
  const [description, setDescription] = useState(data?.description || "");
  const [category, setCategory] = useState(data?.category || "Work");
  const [priority, setPriority] = useState(data?.priority || "Medium");
  const [dueDate, setDueDate] = useState(data?.dueDate || getTodayString());
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim()) {
      alert("Please provide a task title!");
      return;
    }
    onSubmit({
      ...data,
      title,
      description,
      priority,
      category,
      dueDate,
    });
  };

  useEffect(() => {
    if (isOpen) {
      setTitle(data?.title || "");
      setDescription(data?.description || "");
      setCategory(data?.category || "Work");
      setPriority(data?.priority || "Medium");
      setDueDate(data?.dueDate || getTodayString());
    }
  }, [isOpen, data]);

  if (!isOpen) return null;
  
  return (
    <div>
      
    </div>
  );
}