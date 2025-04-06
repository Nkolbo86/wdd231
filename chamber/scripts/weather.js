const apiKey = "4b4280f3f0ba704bb7e03bf4cc4884be"; // Replace with your actual key if needed
const lat = 32.13971;   // Your latitude
const lon = -95.32029;  // Your longitude

const weatherURL = `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&units=imperial&appid=${apiKey}`;

async function getWeather() {
  try {
    const response = await fetch(weatherURL);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    const container = document.getElementById("weather-summary");
    if (container) {
      container.innerHTML = `<p>Weather data unavailable.</p>`;
    }
    console.error("Weather error:", error);
  }
}

function displayWeather(data) {
  const container = document.getElementById("weather-summary");
  if (!container) return;

  const html = `
    <p><strong>Current Temp:</strong> ${data.main.temp.toFixed(1)} °F</p>
    <p><strong>Conditions:</strong> ${data.weather[0].description}</p>
  `;

  container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", () => {
  getWeather();
});
