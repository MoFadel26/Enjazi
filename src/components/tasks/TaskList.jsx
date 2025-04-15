import { TaskItem } from "./TaskItem";

export function TaskList({ tasks, filteredView, onToggleComplete, onOpenEditModal }) {
  const viewTitleMap = {
    all: "All Tasks",
    today: "Today",
    upcoming: "Upcoming",
    completed: "Completed",
  };
  const title = viewTitleMap[filteredView] || "All Tasks";

  return (
    <div className="bg-white p-4 border rounded-md">
      <div className="flex items-center justify-between pb-3 border-b mb-3">
        <h2 className="text-xl font-semibold text-gray">
          {title} ({tasks.length})
        </h2>
        
      </div>
      {tasks.length === 0 ? (
        <div className="text-center text-gray-400 py-6">No tasks found...</div>
      ) : (
        <div className="divide-y divide-gray-200">
          {tasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onToggleComplete={onToggleComplete}
              onOpenEditModal={onOpenEditModal}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default TaskList;