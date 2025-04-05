import BuildMatrix from './BuildMatrix';

import {
  format,
  isSameMonth,
  isSameDay
} from 'date-fns';


function ViewMonth ({currentDate, tasks}) {
  const matrix = BuildMatrix(currentDate,0);
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat']; // Starting from Sunday

  return (
    <div>
      <div>
        {/* Building Weekday Header*/}
        {weekdays.map((day) => (
            <div key={day} className="py-2 text-center text-sm font-medium text-gray-600">
              {day}
            </div>
          ))}
      </div>
      {/* Building Calendar Rows*/}
      <div>
        {
          matrix.map((week, weekIndex) => (
            <div key={weekIndex} className="grid grid-cols-7">
              {week.map((day) => {
                const checkSameMonth = isSameMonth(day, currentDate);
                const checkIsToday = isSameDay(day, new Date());
                const dayNumber = format(day, 'd');
    
                // Filter Tasks/Events that match day
                const dayTasks = tasks.filter((task) => isSameDay(task.start, day));

                return (
                  <div
                    key={day.toString()}
                    className={`h-24 border-r border-b p-2 relative ${
                      !checkSameMonth ? 'bg-gray-50 text-gray-400' : 'bg-white'
                    } ${checkIsToday && checkSameMonth ? 'bg-indigo-50' : ''}`}
                  >
                    <div className="text-sm font-semibold">{dayNumber}</div>
                    
                    {dayTasks.map((ev) => (
                      <div
                        key={ev.id}
                        className={`mt-1 text-xs rounded px-1 py-0.5 text-white ${
                          ev.colorClass || 'bg-purple-500'
                        }`}
                      >
                        {ev.title}
                      </div>
                    ))}

                  </div>
                );
              })}
            </div>
          ))
        }
      </div>
    </div>
  );
}


export default ViewMonth;