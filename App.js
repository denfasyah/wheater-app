const apiUrl =
  "https://api.openweathermap.org/data/2.5/weather?units=metric&q=";
const apiKey = "4ff513511a5b611f25ff065ee407a89d";
const weatherIcons = {
  Clear: "img/clear.png",
  Night: "img/night.png",
  // Clouds: "img/clouds.png",
  // Rain: "img/rain.png",
  // Drizzle:"img/drizzle.png",
  // Haze: "img/haze.png",
};

const searchBorder = document.querySelector(".search input");
const searchButton = document.querySelector(".search button");
const cityElement = document.querySelector(".city");
const tempElement = document.querySelector(".temp");
const humidityElement = document.querySelector(".humidity");
const windElement = document.querySelector(".wind");
const weatherIcon = document.querySelector(".weather-icon");

async function getWeather(city) {
  try {
    const response = await fetch(`${apiUrl}${city}&appid=${apiKey}`);
    if (response.ok) {
      const data = await response.json();
      cityElement.innerHTML = data.name;
      tempElement.innerHTML = Math.floor(data.main.temp) + "°C";
      humidityElement.innerHTML = data.main.humidity + "%";
      windElement.innerHTML = data.wind.speed + "km/h";
      document.querySelector(".error").style.display = "none";
      document.querySelector(".weather").style.display = "block";
      document.querySelector(".use").style.display = "none";

      const currentTime = new Date();
      const currentHour = currentTime.getHours();

      let weatherIconSrc;
      if (currentHour >= 6 && currentHour < 18) {
        weatherIconSrc = weatherIcons.Clear; 
      } else {
        weatherIconSrc = weatherIcons.Night; 
      }

      if (data.weather && data.weather.length > 0) {
        const weatherCondition = data.weather[0].main;
        if (weatherCondition in weatherIcons) {
          weatherIconSrc = weatherIcons[weatherCondition];
        }
      }

      weatherIcon.src = weatherIconSrc || "img/default.png";
    } else {
      document.querySelector(".error").style.display = "block";
      document.querySelector(".weather").style.display = "none";
      document.querySelector(".use").style.display = "none";
    }
  } catch (error) {
    console.error("ada kesalahan", error);
  }
}

searchButton.addEventListener("click", () => {
  getWeather(searchBorder.value);
});
