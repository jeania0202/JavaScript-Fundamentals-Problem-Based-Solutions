const carbonRates = {
  car: 0.2,
  bus: 0.1,
  bike: 0,
  walk: 0
};

let weeklyLogs = {};

function getWeekKey(date = new Date()) {
  const firstDay = new Date(date.getFullYear(), 0, 1);
  const pastDays = (date - firstDay) / 86400000;
  const week = Math.ceil((pastDays + firstDay.getDay() + 1) / 7);
  return `${date.getFullYear()}-W${week}`;
}

function logTrip() {
  const mode = document.getElementById('mode').value;
  const date = new Date();
  const weekKey = getWeekKey(date);
    if (!weeklyLogs[weekKey]) {
    weeklyLogs[weekKey] = [];
    }
    weeklyLogs[weekKey].push({ mode, date });   
    displayResults();
}


 








