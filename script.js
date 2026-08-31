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
let airQualityIndex = document.querySelector("#air-quality-index");
let airQualityStatus = document.querySelector("#air-quality-status");
let airQualityMessage = document.querySelector("#air-quality-message");
let daysForcast = document.querySelector(".forecast-grid");
let sunriseTime = document.querySelector("#sunrise-time");
let sunsetTime = document.querySelector("#sunset-time");
let heroCard = document.querySelector(".hero-card");
let errorMessage = document.querySelector(".error-message");
let dashboard = document.querySelector(".dashboard-section");
let airCard = document.querySelector(".air-card");
let sunGrid = document.querySelector(".sun-grid");
searchForm.addEventListener("submit", async (event) => {
    event.preventDefault();
    let getInput = searchInput.value.trim();
    if (getInput.length == 0) {
        errorMessage.innerHTML = `
            <h1>Please enter a city name</h1>
            <p>Search for a city to see the weather.</p>
        `;

        errorMessage.style.display = "block";

        heroCard.style.display = "none";
        dashboard.style.display = "none";
        airCard.style.display = "none";
        sunGrid.style.display = "none";
        hourlyList.style.display = "none";
        daysForcast.style.display = "none";
        return;
    }
    const apiKey = "d2df6b20b1964e2bb52130357260308";
    let urlAPI = `https://api.weatherapi.com/v1/forecast.json?key=${apiKey}&q=${getInput}&days=5&aqi=yes`;

    let response = await fetch(urlAPI);

    if (!response.ok) {

        errorMessage.innerHTML = `
            <h1>City not found</h1>
            <p>Please check the spelling and try again.</p>
        `;

        errorMessage.style.display = "block";

        heroCard.style.display = "none";
        dashboard.style.display = "none";
        airCard.style.display = "none";
        sunGrid.style.display = "none";
        hourlyList.style.display = "none";
        daysForcast.style.display = "none";
        return;
    }

    errorMessage.style.display = "none";

    heroCard.style.display = "flex";
    dashboard.style.display = "block";
    airCard.style.display = "block";
    sunGrid.style.display = "grid";
    hourlyList.style.display = "grid";
    daysForcast.style.display = "grid";


    let data = await response.json();
    let date = new Date(data.location.localtime);
    let day = date.toLocaleDateString("en-US", {
        weekday: "long",
        day: "numeric",
        month: "long",
        year: "numeric"
    });
    cityName.textContent = data.location.name;
    currentTemp.innerHTML = `${data.current.temp_c}&deg;C`;
    weatherDescription.textContent = data.current.condition.text;
    localTime.textContent = date.toLocaleTimeString();
    countryCode.textContent = data.location.country;
    currentDate.textContent = `${day}`;
    let code = data.current.condition.code;
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
    else if (code == 1030) {
        weatherIcon = `<i class="fa-solid fa-smog"></i>`;
    }
    else if (code == 1063 || code == 1183 || code == 1189 || code == 1195) {
        weatherIcon = `<i class="fa-solid fa-cloud-rain"></i>`;
    }
    else if (code == 1210 || code == 1213 || code == 1216 || code == 1219 || code == 1222 || code == 1225) {
        weatherIcon = `<i class="fa-regular fa-snowflake"></i>`;
    }
    else if (code == 1273 || code == 1276 || code == 1279 || code == 1282) {
        weatherIcon = `<i class="fa-solid fa-cloud-bolt"></i>`;
    }
    else {
        weatherIcon = `<i class="fa-solid fa-cloud"></i>`;
    }

    weatherSymbol.innerHTML = weatherIcon;

    feelsLike.innerHTML = `${data.current.feelslike_c}&deg;C`;
    humidity.innerHTML = `${data.current.humidity}%`;
    windSpeed.innerHTML = `${data.current.wind_kph}km/h`;
    pressure.innerHTML = `${data.current.pressure_mb}hpa`;
    visibility.innerHTML = `${data.current.vis_km}km`;
    uvIndex.textContent = data.current.uv;
    let currentHour = date.getHours();

    hourlyList.innerHTML = "";

    for (let i = currentHour; i < currentHour + 6; i++) {

        let am_pm = "AM";
        

        let hourIndex = i;
        let forecastdayIndex = 0;

        // Handle crossing midnight
        if (i >= 24) {
            hourIndex = i - 24;
            forecastdayIndex = 1;
        }
        let hour = hourIndex;

        // Convert to 12-hour format
        if (hour == 12) {
            am_pm = "PM";
        }
        else if (hour == 0) {
            hour = 12;
        }
        else if (hour > 12) {
            hour = hour - 12;
            am_pm = "PM";
        }

        let code = data.forecast.forecastday[forecastdayIndex].hour[hourIndex].condition.code;

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
        else if (code == 1030) {
            weatherIcon = `<i class="fa-solid fa-smog"></i>`;
        }
        else if (code == 1063 || code == 1183 || code == 1189 || code == 1195) {
            weatherIcon = `<i class="fa-solid fa-cloud-rain"></i>`;
        }
        else if (code == 1210 || code == 1213 || code == 1216 || code == 1219 || code == 1222 || code == 1225) {
            weatherIcon = `<i class="fa-regular fa-snowflake"></i>`;
        }
        else if (code == 1273 || code == 1276 || code == 1279 || code == 1282) {
            weatherIcon = `<i class="fa-solid fa-cloud-bolt"></i>`;
        }
        else {
            weatherIcon = `<i class="fa-solid fa-cloud"></i>`;
        }

        hourlyList.innerHTML += `
        <article class="hour-card">
            <p id="hour-one-time">${hour} ${am_pm}</p>
            ${weatherIcon}
            <strong id="hour-one-temp">
                ${data.forecast.forecastday[forecastdayIndex].hour[hourIndex].temp_c}&deg;C
            </strong>
        </article>
    `;
    }

let airQuality = data.current.air_quality['us-epa-index'];
airQualityIndex.textContent = `${airQuality}`;

if (airQuality == 1) {
    airQualityIndex.style.color = "#16a34a";
    airQualityIndex.style.background = "rgba(22, 163, 74, 0.14)";
    airQualityMessage.textContent = "Air quality is excellent. Perfect for outdoor activities.";
    airQualityStatus.textContent = "Good"
} else if (airQuality == 2) {
    airQualityIndex.style.color = "#EAB308";
    airQualityIndex.style.background = "rgba(234, 179, 8, 0.14)";
    airQualityMessage.textContent = "Air quality is acceptable for most people.";
    airQualityStatus.textContent = "Moderate";
} else if (airQuality == 3) {
    airQualityIndex.style.color = "#F97316";
    airQualityIndex.style.background = "rgba(249, 115, 22, 0.14)";
    airQualityMessage.textContent = "Sensitive people should reduce prolonged outdoor activity.";
    airQualityStatus.textContent = "Unhealthy for Sensitive Groups";
} else if (airQuality == 4) {
    airQualityIndex.style.color = "#DC2626";
    airQualityIndex.style.background = "rgba(220, 38, 38, 0.14)";
    airQualityMessage.textContent = "Air quality is unhealthy. Limit outdoor exposure.";
    airQualityStatus.textContent = "Unhealthy"
} else if (airQuality == 5) {
    airQualityIndex.style.color = "#9333EA";
    airQualityIndex.style.background = "rgba(147, 51, 234, 0.14)";
    airQualityMessage.textContent = "Air quality is very unhealthy. Avoid prolonged outdoor activities.";
    airQualityStatus.textContent = "Very Unhealthy";
} else {
    airQualityIndex.style.color = "#7F1D1D";
    airQualityIndex.style.background = "rgba(127, 29, 29, 0.14)";
    airQualityMessage.textContent = "Hazardous air quality. Stay indoors whenever possible.";
    airQualityStatus.textContent = "Hazardous";
}

daysForcast.innerHTML = "";
data.forecast.forecastday.forEach((day, i) => {
    let date2 = new Date(day.date);
    let weekday2 = date2.toLocaleDateString("en-US", { weekday: "short" });
    let code = day.day.condition.code;
    let maxtemp = day.day.maxtemp_c;
    let mintemp = day.day.mintemp_c;
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
    else if (code == 1030) {
        weatherIcon = `<i class="fa-solid fa-smog"></i>`;
    }
    else if (code == 1063 || code == 1183 || code == 1189 || code == 1195) {
        weatherIcon = `<i class="fa-solid fa-cloud-rain"></i>`;
    }
    else if (code == 1210 || code == 1213 || code == 1216 || code == 1219 || code == 1222 || code == 1225) {
        weatherIcon = `<i class="fa-regular fa-snowflake"></i>`;
    }
    else if (code == 1273 || code == 1276 || code == 1279 || code == 1282) {
        weatherIcon = `<i class="fa-solid fa-cloud-bolt"></i>`;
    }
    else {
        weatherIcon = `<i class="fa-solid fa-cloud"></i>`;
    }
    daysForcast.innerHTML +=
        `<article class="forecast-card">
            <p id="forecast-day-one">${weekday2}</p>
            ${weatherIcon}
            <strong id="forecast-temp-one">${maxtemp}&deg; / ${mintemp}&deg;</strong>
            <span id="forecast-condition-one">${day.day.condition.text}</span>
          </article>`

});
sunriseTime.textContent = data.forecast.forecastday[0].astro.sunrise;
sunsetTime.textContent = data.forecast.forecastday[0].astro.sunset;


});