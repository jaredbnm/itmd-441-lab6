const cityCoordinates = {
  "Chicago": { lat: 41.85003, lng: -87.65005 },
  "New York City": { lat: 40.71427, lng: -74.00597 },
  "San Francisco": { lat: 37.77493, lng: -122.41942 },
  "Miami": { lat: 25.77427, lng: -80.19366 },
  "Seattle": { lat: 47.60621, lng: -122.33207 },
  "Atlanta": { lat: 33.749, lng: -84.38798 },
  "Detroit": { lat: 42.33143, lng: -83.04575 },
  "Philadelphia": { lat: 39.95233, lng: -75.16379 },
  "Memphis": { lat: 35.14953, lng: -90.04898 },
  "Houston": { lat: 29.76328, lng: -95.36327 }
};

document.getElementById("city").addEventListener("change", function () {
  const city = this.value;
  const coords = cityCoordinates[city];

  if (!coords) return;

  document.getElementById("city-title").textContent = city

  const todayURL = `https://api.sunrisesunset.io/json?lat=${coords.lat}&lng=${coords.lng}&date=today`;
  fetch(todayURL)
    .then(response => response.json())
    .then(data => updateDashboard(data.results, "today"))
    .catch(error => console.error("Error fetching today:", error));

  const tomorrowURL = `https://api.sunrisesunset.io/json?lat=${coords.lat}&lng=${coords.lng}&date=tomorrow`;
  fetch(tomorrowURL)
    .then(response => response.json())
    .then(data => updateDashboard(data.results, "tomorrow"))
    .catch(err => console.error("Error fetching tomorrow:", err));
});

function updateDashboard(data, prefix) {
  document.getElementById(`${prefix}-sunrise`).children[1].textContent = data.sunrise;
  document.getElementById(`${prefix}-sunset`).children[1].textContent = data.sunset;
  document.getElementById(`${prefix}-dawn`).children[0].textContent = data.dawn;
  document.getElementById(`${prefix}-dusk`).children[0].textContent = data.dusk;
  document.getElementById(`${prefix}-day-length`).children[1].textContent = data.day_length;
  document.getElementById(`${prefix}-solar-noon`).children[1].textContent = data.solar_noon;
  document.getElementById(`${prefix}-timezone`).children[1].textContent = data.timezone;
}

function formatDate(date) {
  return date.toLocaleDateString("en-US", {
    weekday: "long", year: "numeric", month: "long", day: "numeric"
  });
}

function updateDates() {
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  document.getElementById("today-date").textContent = formatDate(today);
  document.getElementById("tomorrow-date").textContent = formatDate(tomorrow);
}
updateDates();