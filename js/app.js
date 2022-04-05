function formatDate(timestamp) {
  let date = new Date(timestamp);
  let hours = date.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = date.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`;
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;

  let forecastElement = document.querySelector("#forecast");

  let forecastHTML = `<div class="row text-center">`;
  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
          forecastHTML +
          `
          <div class="col-2 p-3 p-sm-2 cloud-p">
          <img
          src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
          />
          <h6 style="color: #9ab9cf">${formatDay(forecastDay.dt)}</h6>
          <h6 class="text-secondary">${Math.round(
              forecastDay.temp.max
          )}° / 
          ${Math.round(
              forecastDay.temp.min
          )}°
          </h6>
          </div>
  `;
    }
  });
  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "b69a892df9f98e17c54dab23a734680a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
}

function displayWeatherCondition(response) {
  let city = response.data.name;
  cel = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let desc = response.data.weather[0].description;
  let iCode = response.data.weather[0].icon;
  let img = `http://openweathermap.org/img/wn/${iCode}@2x.png`;

  document.querySelector("#city").innerHTML = `${city}`;
  document.querySelector("#deg").innerHTML = `${cel}`;
  document.querySelector("#wind").innerHTML = `wind speed : ${wind} m/s`;
  document.querySelector("#desc").innerHTML = `${desc}`;
  document.querySelector("#i").setAttribute("src", `${img}`);

  getForecast(response.data.coord);
}

function searchCity(city) {
  let apiKey = "b69a892df9f98e17c54dab23a734680a";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}

function currentLoc(position) {
  let apiKey = "5f472b7acba333cd8a035ea85a0d4d4c";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayWeatherCondition);
}
navigator.geolocation.getCurrentPosition(currentLoc);

function currentBtn(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(currentLoc);
}

let current = document.querySelector("#btn-current");
if (current) {
  current.addEventListener("click", currentBtn);
}

function Submit(event) {
  event.preventDefault();
  let search = document.querySelector("#search").value;
  searchCity(search);
}
let searchBar = document.querySelector("#searchBar");
if (searchBar) {
  searchBar.addEventListener("submit", Submit);
}

let cel = null;

function showFar(event) {
  event.preventDefault();
  let farVal = Math.round((cel * 9) / 5 + 32);
  document.querySelector("#deg").innerHTML = `${farVal}`;
}
let farClick = document.querySelector("#far");
if (farClick) {
  farClick.addEventListener("click", showFar);
}

function showCel(event) {
  event.preventDefault();
  document.querySelector("#deg").innerHTML = `${cel}`;
}
let celClick = document.querySelector("#cel");
if (celClick) {
  celClick.addEventListener("click", showCel);
}