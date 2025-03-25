const weatherContainer = document.getElementById("weather-summary");

const apiKey = "4b4280f3f0ba704bb7e03bf4cc4884be";
const lat = 32.13971;
const lon = -95.32029;

const weatherURL = `https://api.openweathermap.org/data/2.5/onecall?lat=${lat}&lon=${lon}&exclude=hourly,minutely,alerts&units=imperial&appid=${apiKey}`;

async function getWeather() {
  try {
    const response = await fetch(weatherURL);
    const data = await response.json();
    displayWeather(data);
  } catch (error) {
    weatherContainer.innerHTML = `<p>Weather data unavailable.</p>`;
    console.error("Weather error:", error);
  }
}

function displayWeather(data) {
  const current = data.current;
  const forecast = data.daily.slice(1, 4); // Next 3 days

  const html = `
    <p><strong>Current Temp:</strong> ${current.temp.toFixed(1)} °F</p>
    <p><strong>Conditions:</strong> ${current.weather[0].description}</p>
    <h3>3-Day Forecast:</h3>
    <ul>
      ${forecast
        .map(day => {
          const date = new Date(day.dt * 1000);
          const weekday = date.toLocaleDateString("en-US", { weekday: "long" });
          return `<li><strong>${weekday}:</strong> High ${day.temp.max.toFixed(1)} °F, ${day.weather[0].description}</li>`;
        })
        .join("")}
    </ul>
  `;

  weatherContainer.innerHTML = html;
}

getWeather();
