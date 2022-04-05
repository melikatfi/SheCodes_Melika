function displayWeatherCondition(response) {
  let city = response.data.name;
  cel = Math.round(response.data.main.temp);
  let wind = Math.round(response.data.wind.speed);
  let desc = response.data.weather[0].description;
  iCode = response.data.weather[0].icon;
  let img = `http://openweathermap.org/img/wn/${iCode}@2x.png`;

  document.querySelector("#city").innerHTML = `${city}`;
  document.querySelector("#deg").innerHTML = `${cel}`;
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

let cel = null;
let iCode = null

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
function showDef(){
  document.querySelector("#vid").setAttribute("src", `imgvid/Cloudy-sky.mp4`);
}

if(iCode === '01d' || '01n' || '09d' || '09n'){
  document.querySelector("#vid").setAttribute("src", `imgvid/clearsky.mp4`);
}else {
  if(iCode === '02d' || '02n' || '03d' || '03n' || '04d' || '04n'){
    document.querySelector("#vid").setAttribute("src", `imgvid/Cloudy-sky.mp4`);
  }else{
    if (iCode === '09d' || '09n' || '10d' || '10n'){
      document.querySelector("#vid").setAttribute("src", `imgvid/Rainonapuddle.mp4`);
    }else {
      if (iCode === '11d' || '11n') {
        document.querySelector("#vid").setAttribute("src", `imgvid/thunder.mov`);
      }else {
        if (iCode === '13d' || '13n') {
          document.querySelector("#vid").setAttribute("src", `imgvid/Snow.mp4`);
        }else {
          if (iCode === '50d' || '50n') {
            document.querySelector("#vid").setAttribute("src", `imgvid/mist.mp4`);
          }
        }
      }
    }
  }
}