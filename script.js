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
    humidity.innerHTML =`${data.main.humidity}%`;
    windSpeed.innerHTML =`${(data.wind.speed)*3.6}km/h`;
    pressure.innerHTML =`${data.main.pressure}hpa`;
    visibility.innerHTML =`${data.visibility/1000}km`;
    uvIndex.innerHTML =`${data.main.humidity}`;


    console.log(data);
    console.log(date.getDate());
    console.log(date.getMonth());
    console.log(date.getFullYear());
    console.log(date.getTime());
    console.log(date.getHours());
    console.log(date.getMinutes());
    console.log(date.toLocaleTimeString());


})