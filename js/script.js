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

  document.getElementById("city-title").textContent = selected

  const todayURL = `https://api.sunrisesunset.io/json?lat=${coords.lat}&lng=${coords.lng}&date=today`;
  fetch(todayURL)
    .then(res => res.json())
    .then(data => updateDashboard(data.results, "today"))
    .catch(err => console.error("Error fetching today:", err));

  const tomorrowURL = `https://api.sunrisesunset.io/json?lat=${coords.lat}&lng=${coords.lng}&date=tomorrow`;
  fetch(tomorrowURL)
    .then(response => response.json())
    .then(data => updateDashboard(data.results, "tomorrow"))
    .catch(error => console.error("Error fetching tomorrow:", error));
});

function updateDashboard(data, prefix) {
  document.querySelector(`#${prefix}-sunrise p:nth-of-type(1)`).innerHTML = data.sunrise;
  document.querySelector(`#${prefix}-sunset p:nth-of-type(1)`).innerHTML = data.sunset;
  document.querySelector(`#${prefix}-dawn p:nth-of-type(1)`).innerHTML = data.dawn;
  document.querySelector(`#${prefix}-dusk p:nth-of-type(1)`).innerHTML = data.dusk;
  document.querySelector(`#${prefix}-day-length p:nth-of-type(2)`).innerHTML = data.day_length;
  document.querySelector(`#${prefix}-solar-noon p:nth-of-type(2)`).innerHTML = data.solar_noon;
  document.querySelector(`#${prefix}-timezone p:nth-of-type(2)`).innerHTML = data.timezone;
}