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
  const distance = parseFloat(document.getElementById("distance").value);
  const mode = document.getElementById("mode").value;

  if (!distance || distance <= 0) {
    alert("Please enter a valid distance.");
    return;
  }

  const carEmission = distance * carbonRates.car;
  const userEmission = distance * carbonRates[mode];
  const saved = carEmission - userEmission;

  const weekKey = getWeekKey();

    if (!weeklyLogs[weekKey]) {
        weeklyLogs[weekKey] = [];
    }
    weeklyLogs[weekKey].push({ mode, distance, saved, date: new Date() });

    document.getElementById("result").innerText =
    `You saved ${saved.toFixed(2)} kg CO2 today vs. driving 🚗`;
  
    updateUI();
}


function updateUI() {
  const currentWeek = getWeekKey();
  const list = document.getElementById("logList");
  const weekly = document.getElementById("weekly");

  list.innerHTML = "";

  const logs = weeklyLogs[currentWeek] || [];

  let totalSaved = 0;
  let ecoTrips = 0;

  logs.forEach(log => {
    totalSaved += log.saved;
    if (log.mode !== "car") ecoTrips++;

    const li = document.createElement("li");
    li.textContent = `${log.date} - ${log.mode.toUpperCase()} ${log.distance} km → Saved ${log.saved.toFixed(2)} kg`;
    list.appendChild(li);
  });

  weekly.innerText =
    `${ecoTrips} eco trips = ${totalSaved.toFixed(2)} kg CO2 saved this week `;

  renderPastWeeks();
}

function renderPastWeeks() {
  const container = document.getElementById("pastWeeks");
  container.innerHTML = "<h3>Past Weeks</h3>";

  Object.keys(weeklyLogs).forEach(week => {
    const logs = weeklyLogs[week];

    let total = 0;
    logs.forEach(l => total += l.saved);

    const div = document.createElement("div");
    div.className = "card";
    div.innerHTML = `
      <strong>${week}</strong><br>
      Total Saved: ${total.toFixed(2)} kg CO2
    `;

    container.appendChild(div);
  });
}







