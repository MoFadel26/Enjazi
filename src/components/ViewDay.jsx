import {
  format,
  isSameDay
} from 'date-fns';

function DayView({ currentDate, Tasks }) {
  // Just show the day name and all events for that day in a list
  const dayLabel = format(currentDate, 'EEEE, MMM d yyyy');
  const dayTasks = Tasks.filter((task) => isSameDay(task.start, currentDate));

  return (
    <div className="border p-4 bg-white">
      <h2 className="text-lg font-semibold mb-4">{dayLabel}</h2>
      {dayTasks.length > 0 ? (
        dayTasks.map((ev) => (
          <div
            key={ev.id}
            className={`mb-2 text-sm rounded px-2 py-1 text-white ${
              ev.colorClass || 'bg-pink-500'
            }`}
          >
            <strong>{ev.title}</strong>
            <div className="text-xs">{format(ev.start, 'p')} - {format(ev.end, 'p')}</div>
          </div>
        ))
      ) : (
        <p className="text-sm text-gray-500">No events today.</p>
      )}
    </div>
  );
}

export default DayView;