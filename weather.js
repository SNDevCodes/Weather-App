let cityInput = document.querySelector('.city-input');
let cityValue = document.querySelector('.city');
let cityName = document.querySelector('.cityName');
let weatherIcon = document.querySelector('.weather-icon');
let weatherContent = document.querySelector('.weather-content');
let weatherContainer = document.querySelector('.weather-container');
let error = document.querySelector('.error');
let temp = document.querySelector('.temp');
let wind = document.querySelector('.wind-perc');
let humidity = document.querySelector('.humidity-perc');
let searchClick = $(".search-icon");
let apiKey = "&appid=4b73387a5ac8ca348e14ac915adb001c";
let units = '&units=metric';
let url = 'https://api.openweathermap.org/data/2.5/weather?q=';

function errored(){
    let errorAudio = new Audio('./sounds/error.mp3');
    errorAudio.play();
    error.classList.add('show')
    weatherContent.classList.remove('show');
    cityInput.value = '';
    weatherContainer.classList.add('errors');

    setTimeout(() => {
        weatherContainer.classList.remove('errors');
    }, 200);
    cityInput.focus();
    
}

// Async function to fetch data from the API 
async function weather(cityinput) {
    const response = await fetch(url + `${cityInput.value}` + apiKey + units);
    let data = await response.json();

    
    if (cityInput.value == '') {
        errored();
    }
    else if (response.status == 404) {
        errored();
    }
    else {
        weatherContainer.classList.add('success');

        setTimeout(() => {
            weatherContainer.classList.remove('success');
        }, 200);
        error.classList.remove('show')
        weatherContent.classList.add('show');
        temp.innerHTML = Math.round(data.main.temp) + " °C";
        wind.innerHTML = data.wind.speed + " km/h";
        cityName.innerHTML = data.name;
        humidity.innerHTML = data.main.humidity + " %";
        weatherIcon.src = './images/' + data.weather[0].main + '.png';
        weatherIcon.title = data.weather[0].main;
        cityInput.value = '';
        searchClick.addClass('active');

        setTimeout(() => {
            searchClick.removeClass('active');
        }, 100)
    }

}


// Click Enter button Listener 
window.addEventListener('keydown', (e) => {

    if (e.key == 'Enter') {
        weather(cityInput.value);
    }
    if (e.key == 'Delete') {
        cityInput.value = '';
        cityInput.focus();
    }
})

// On Click 
searchClick.on('click', () => {
    weather(cityInput.value);
})