let submitBtn = document.getElementById('submitBtn');
let searchBtn = document.getElementById('searchBtn');
let backBtn = document.getElementById('backBtn');

let introSection = document.getElementById('introSection');
let displaySection = document.getElementById('displaySection')
let moodSelection = $('#moodSelect');

searchBtn.addEventListener('click', userSearch);
submitBtn.addEventListener('click', changeDisplay);
backBtn.addEventListener('click', homeScreen);



let chosenCity = document.getElementById('search-input'); 


let limit = 5;

// let savedCities = [];
let cityOptionsList = [];

let cityInfo = {
    lon: 0,
    lat: 0,
    cityName: ""
}


displaySection.setAttribute("style", "display: none;");

function userSearch(){
    let city = chosenCity.value.trim();
    // console.log('chosenCity -> ', city);
    
    citySearch(city);

}


function chooseCity() {
    cities.setAttribute('style', 'display: none');

    // let isDoubled = false;
    let selectedCityIndex = cities.selectedIndex-1;
    let lon = cityOptionsList[selectedCityIndex].lon;
    let lat = cityOptionsList[selectedCityIndex].lat;
    let cityName = cityOptionsList[selectedCityIndex].name;

    // showCityList();
    getTodaysWeather(lon, lat, cityName);
    getThreeHourCast(lon, lat);
}

function changeDisplay(event) {
  event.preventDefault();
  introSection.setAttribute("style", "display: none;");
  displaySection.setAttribute("style", "display: block;");
//   buildPlaylist();
  getDailyQuote();  
}



function homeScreen() {
  displaySection.setAttribute("style", "display: none;");
  introSection.setAttribute("style", "display: block;");
}

//API call to get city name
function citySearch(cityName){
    let coordinatesAPI = 'https://api.openweathermap.org/geo/1.0/direct?q=' + cityName + '&limit=' + limit + '&appid=' + '45f42fe1e7919a2ec27993b0a0b90a7e';
    
    fetch(coordinatesAPI, {
    method: 'GET'
    })
    .then(function (response) {
        return response.json();
    }).then( function(data) {
        cities.innerHTML = "";
        cityOptionsList = data;
        let optionPlaceholder = document.createElement("option");
        optionPlaceholder.setAttribute("selected", "selected")
        optionPlaceholder.textContent = "Select City";
        cities.appendChild(optionPlaceholder);
        
        for (let i = 0; i < cityOptionsList.length; i++) {
            let option = document.createElement("option");
            option.textContent = cityOptionsList[i].name + ', ' + cityOptionsList[i].state + ', ' + cityOptionsList[i].country; 
            cities.appendChild(option);
        }
        cities.setAttribute('style', 'display: block');
        
    });
    
}

// //populate todays weather information 
function getTodaysWeather(lon, lat, cityName) {
    let queryURL = 'https://api.openweathermap.org/data/2.5/weather?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + '45f42fe1e7919a2ec27993b0a0b90a7e';
    fetch(queryURL, {
        method: 'GET'
    })
    .then(function (response) {
        return response.json();
    })
    .then(function (data) {
        let todayWeatherCity = document.getElementById('today-weather-city');
        let unixTime = data.dt;
        let unixToHour = dayjs.unix(unixTime).format('h:mm a, MMM D'); // the current weather
       
        todayWeatherCity.textContent = cityName + ": " + unixToHour

        let actualTemp = document.getElementById('temp');
        actualTemp.textContent='Temp: ' + data.main.temp + ' °C';
        let feelsLikeTemp = document.getElementById('feels-like');
        feelsLikeTemp.textContent='Feels like: ' + data.main.feels_like + ' °C';
        let weatherDescription = document.getElementById('description');
        weatherDescription.textContent = data.weather[0].description;
        let windSpeed = document.getElementById('wind');
        windSpeed.textContent='Wind Speed: ' + data.wind.speed + ' km/h';
        let humidity = document.getElementById('humidity');
        humidity.textContent='Humidity: ' + data.main.humidity + "%";       
    } );

}; 

//API call to get forecast for a selected city based on its latitude and longitude
function getThreeHourCast(lon, lat) {
    let queryURL = 'https://api.openweathermap.org/data/2.5/forecast?units=metric&lat=' + lat + '&lon=' + lon + '&appid=' + '45f42fe1e7919a2ec27993b0a0b90a7e';
    
    hourlyCast.setAttribute('style', 'display: block');

    fetch(queryURL, {
        method: 'GET'
        })
        .then(function (response) {
            return response.json();
        }).then( function(data) {
            let daysList = data.list;
            
            for (let i=0; i < 3; i++) {

                let unixTime = daysList[i].dt;
                let unixToHour = dayjs.unix(unixTime).format('h a, MMM D'); // the exact hour of the forcast
                let hour = document.getElementById('hour'+i);
                hour.textContent = unixToHour;

                let actualTemp = document.getElementById('temp'+i);
                actualTemp.textContent='Temp: ' + daysList[i].main.temp + ' °C';
                let windSpeed = document.getElementById('wind'+i);
                windSpeed.textContent='Wind Speed: ' + daysList[i].wind.speed + ' km/h';
                let humidity = document.getElementById('humidity'+i);
                humidity.textContent='Humidity: ' + daysList[i].main.humidity + '%';
                let weatherDescription = document.getElementById('description'+i);
                weatherDescription.textContent= daysList[i].weather[0].description;
                let feelsLikeTemp = document.getElementById('feels-like'+i);
                feelsLikeTemp.textContent='Feels like: ' + daysList[i].main.feels_like + ' °C';                
            }; 
            
        });
};   

// Quotable API - quote of the day to be added to the display page, along with temperature forcast and spotify content

function getDailyQuote() {
    let queryURL = 'https://api.quotable.io/quotes/random?maxLength=120';    

    fetch(queryURL, {
        method: 'GET'
        })
        .then(function (response) {
            return response.json();
        }).then( function(data) {
                let dailyQuote = document.getElementById('dailyQuote');
                dailyQuote.textContent = data[0].content;

                let quoteAuthor = document.getElementById('quoteAuthor');
                quoteAuthor.textContent = data[0].author;    
                
        });
};  