const weatherForm = document.querySelector('.getWeather');
const inputCity = document.querySelector('.inputCity');
const card = document.querySelector('.card');
const api = `400ca3c5ea2713fbee600cf090adb19e`;

weatherForm.addEventListener("submit", async (event) => {

    event.preventDefault();

    const city = inputCity.value;

    if (city) {
        try {
            const weather = await getWeather(city);
            getWeatherInfo(weather);
            console.log(weather);
        }
        catch (error) {
            errorDisplay(error);
        }
    }
    else {
        errorDisplay('Nothing Entered');
    }


})

async function getWeather(city) {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${api}`;

    const response = await fetch(apiUrl);

    if (!response.ok) {
        throw new Error("Couldn't fetch Data");
    }

    return await response.json();
}

function getWeatherInfo(data) {

    const { name,
        main: { temp, humidity },
        weather: [{ description, id }] } = data;
    //console.log(data);

    card.textContent = "";
    card.style.display = 'flex';

    const city = document.createElement('h1');
    const tempDisplay = document.createElement('p');
    const humidityDisplay = document.createElement('p');
    const descriptionDisplay = document.createElement('p');
    const Emoji = document.createElement('p');

    city.classList.add('city');
    tempDisplay.classList.add('temp');
    humidityDisplay.classList.add('humidity');
    descriptionDisplay.classList.add('description');
    Emoji.classList.add('weatherEmoji');

    city.textContent = data.name;
    tempDisplay.textContent = `${(data.main.temp - 273.15).toFixed(1)}°C`;
    humidityDisplay.textContent = `Humidity = ${data.main.humidity}`;
    descriptionDisplay.textContent = data.weather[0].description;
    descriptionDisplay.textContent = data.weather[0].description;
    Emoji.textContent = `${weatherEmoji(data.weather[0].id)}`;

    card.appendChild(city);
    card.appendChild(tempDisplay);
    card.appendChild(humidityDisplay);
    card.appendChild(descriptionDisplay);
    card.appendChild(Emoji);
}

function weatherEmoji(data) {
    switch (true) {
        case data < 300: return '⛈';
            break;
        case data >= 300 && data < 500: return '🌧';
            break;
        case data >= 500 && data < 600: return '🌦';
            break;
        case data >= 600 && data < 700: return '❄';
            break;
        case data >= 700 && data < 800: return '🌫';
            break;
        case data == 800: return '☀';
            break;
        case data > 800: return '☁';
            break;
        default: return '❓';
    }
}

function errorDisplay(message) {
    const error = document.createElement('p');
    error.classList.add('error');
    error.textContent = message;

    card.textContent = '';
    card.style.display = 'flex';
    card.appendChild(error);
}