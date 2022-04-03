function displayWeatherCondition(response) {
  let city = response.data.name;
  let cel = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let desc = response.data.weather[0].description;
  let iCode = response.data.weather[0].icon;
  let img = `http://openweathermap.org/img/wn/${iCode}@2x.png`;

  document.querySelector("#city").innerHTML = `${city}`;
  document.querySelector("#cel").innerHTML = `${cel} °C`;
  document.querySelector("#wind").innerHTML = `wind speed : ${wind} m/s`;
  document.querySelector("#desc").innerHTML = `${desc}`;
  document.querySelector("#i").setAttribute("src", `${img}`);
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

function showFar() {
  alert("faaar");
}
let far = document.querySelector("#far");
if (far) {
  far.addEventListener("click", showFar);
}
