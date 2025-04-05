import {
  format,
  addDays,
  startOfWeek,
  isSameDay
} from 'date-fns';


function ViewWeek (currentDate, tasks) {
  const startWeek = startOfWeek(currentDate, {weekStartsOn: 0 });
  const daysOfWeek = Array.from({ length: 7 }, (_, i) => addDays(startWeek, i));
  return (
    <div className="grid grid-cols-7 border-l border-t">
      {daysOfWeek.map((day) => {
        const checkIsToday = isSameDay(day, new Date());
        const dayTasks = tasks.filter((task) => isSameDay(task.start, day));
        
        return (
          <div
            key={day.toString()}
            className={`p-3 min-h-[125px] border-r border-b ${
              checkIsToday ? 'bg-indigo-50' : 'bg-white'
            }`}
          >
            <div className="font-semibold text-sm mb-1">
              {format(day, 'EEE dd')}
            </div>
            {dayTasks.map((ev) => (
              <div
                key={ev.id}
                className={`text-xs rounded px-2 py-1 mb-1 text-white ${
                  ev.colorClass || 'bg-green-600'
                }`}
              >
                {ev.title}
              </div>
            ))}
          </div>
        );
      })}
    </div>
  );
}

export default ViewWeek;