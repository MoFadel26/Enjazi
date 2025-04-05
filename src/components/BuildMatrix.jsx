import {
  addDays,
  startOfMonth,
  endOfMonth,
  startOfWeek,
  endOfWeek,
} from 'date-fns';

// This function can be used to build the matrix of the calendar
function BuildMatrix(date, startWeek=0) {
  const initial = startOfWeek(startOfMonth(date), {startWeek});
  const final = endOfWeek(endOfMonth(date), {startWeek});
  let dayMatrix = [];
  let temp = initial;

  while (temp < final) {
    let week = [];
    for (let i = 0; i < 7; i++) {
      week.push(temp);
      temp = addDays(temp,1);
    }
    dayMatrix.push(week);
  }
  return dayMatrix;
}

export default BuildMatrix;