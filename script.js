let searchInput = document.querySelector("#city-search");
let searchForm = document.querySelector(".search-form");
let cityName = document.querySelector("#city-name");
let currentTemp = document.querySelector("#current-temperature");
let weatherDescription = document.querySelector("#weather-description");
let localTime = document.querySelector("#local-time");
let countryCode = document.querySelector("#country-name");
let currentDate = document.querySelector("#current-date");
let weatherSymbol = document.querySelector(".hero-visual");
let feelsLike = document.querySelector("#feels-like");
let humidity = document.querySelector("#humidity");
let windSpeed = document.querySelector("#wind-speed");
let pressure = document.querySelector("#pressure");
let visibility = document.querySelector("#visibility");
let uvIndex = document.querySelector("#uv-index");
let hourlyList = document.querySelector(".hourly-list");
searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let getInput = searchInput.value.trim();
    if (getInput.length == 0) {
        console.log("please fill the search");
        return;
    }
    const apiKey = "ece578f39219f5eaac5614212171bac7";
    let urlAPI = `https://api.openweathermap.org/data/2.5/weather?q=${getInput}&appid=${apiKey}&units=metric`;

    let response = await fetch(urlAPI);
    let data = await response.json();
    let date = new Date(data.dt * 1000);
    let weather = data.weather[0].main;
    let day = date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    cityName.textContent = `${data.name}`;
    currentTemp.innerHTML = `${data.main.temp}&deg;C`;
    weatherDescription.textContent = `${data.weather[0].main}`;
    localTime.textContent = date.toLocaleTimeString();
    countryCode.textContent = `${data.sys.country}`;
    currentDate.textContent = `${day}`
    if (weather === "Clear") {
        weatherSymbol.innerHTML = `<i class="fa-solid fa-sun"></i>`;
    }
    else if (weather === "Clouds") {
        weatherSymbol.innerHTML = `<i class="fa-solid fa-cloud"></i>`
    }
    else if (weather === "Rain") {
        weatherSymbol.innerHTML = `<i class="fa-solid fa-cloud-rain"></i>`
    }
    else if (weather === "Thunderstorm") {
        weatherSymbol.innerHTML = `<i class="fa-solid fa-bolt"></i>`
    }

    feelsLike.innerHTML = `${data.main.feels_like}&deg;C`;
    humidity.innerHTML = `${data.main.humidity}%`;
    windSpeed.innerHTML = `${(data.wind.speed) * 3.6}km/h`;
    pressure.innerHTML = `${data.main.pressure}hpa`;
    visibility.innerHTML = `${data.visibility / 1000}km`;
    // uvIndex.innerHTML =`${data.main.humidity}`;

    const apiKey2 = "d2df6b20b1964e2bb52130357260308";
    let urlAPI2 = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey2}&q=${getInput}&days=1`;
    let response2 = await fetch(urlAPI2);
    let data2 = await response2.json();
    // console.log(data2.forecast.forecastday[0].hour[23].time);
    // let end=0;
    hourlyList.innerHTML = "";
    let currentHour = date.getHours();
    for (let i = currentHour; i < currentHour + 6; i++) {

        let am_pm = "AM";
        let hour = i;

        if (i == 12) {
            am_pm = "PM";
        }
        else if (i == 0) {
            hour = 12;
        }
        else if (i > 12) {
            hour = i - 12;
            am_pm = "PM";
        }

        // 1000 → Sunny / Clear
        // 1003 → Partly cloudy
        // 1006 → Cloudy
        // 1009 → Overcast
        // 1030 → Mist
        // 1063 → Patchy rain nearby
        // 1183 → Light rain
        // 1189 → Moderate rain
        // 1195 → Heavy rain
        // 1273 → Thunder with rain
        let code = data2.forecast.forecastday[0].hour[i].condition.code;
        let weatherIcon = "";

        if (code == 1000) {
            weatherIcon = `<i class="fa-solid fa-sun"></i>`;
        }
        else if (code == 1003) {
            weatherIcon = `<i class="fa-solid fa-cloud-sun"></i>`;
        }
        else if (code == 1006 || code == 1009) {
            weatherIcon = `<i class="fa-solid fa-cloud"></i>`;
        }
        else if (code == 1063 || code == 1183 || code == 1189 || code == 1195) {
            weatherIcon = `<i class="fa-solid fa-cloud-rain"></i>`;
        }
        hourlyList.innerHTML +=
            `<article class="hour-card">
              <p id="hour-one-time">${hour} ${am_pm}</p>
              ${weatherIcon}
              <strong id="hour-one-temp">${data2.forecast.forecastday[0].hour[i].temp_c}&deg;C</strong>
        </article>`
    }
    // end++

    // console.log(date.getHours())
    // console.log(data2.forecast.forecastday[0].hour[i].condition.text);


})