let submitBtn = document.getElementById('submitBtn');
let searchBtn = document.getElementById('searchBtn');
let backBtn = document.getElementById('backBtn');

searchBtn.addEventListener('click', userSearch);
submitBtn.addEventListener('click', changeDisplay);
backBtn.addEventListener('click', homeScreen);







// let cityName;
// let longCoordinate;
// let latCoordinate;

// var apiKey = 'c8334cad6bb5355d5be9600b1a12f31c';


// let cityList = document.querySelector("#cityList");
let chosenCity = document.getElementById('search-input'); 
// let submitBtn = document.getElementById('submitBtn'); 
// let clearBtn = document.getElementById('clearBtn');
// let cities = document.getElementById('cities');
// let forecast = document.getElementById('forecast');
// let today = document.getElementById('today')

let limit = 5;

// let savedCities = [];
let cityOptionsList = [];

let cityInfo = {
    lon: 0,
    lat: 0,
    cityName: ""
}

// const dayNames = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']

// //have the saved previously searched cities populate upon page load
// function init () {
//     getStoredCities();
//     showCityList();
// }

// function getStoredCities() {
//     savedCities = JSON.parse(localStorage.getItem("storageSavedCities")) || [];
// }

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

    // getStoredCities();

    //add condition to check if two of the same cities are being saved into local storage
    // for (let i = 0; i < savedCities.length; i++) {
    //     let city = savedCities[i];
    //     if (city.cityName == cityName) {
    //         isDoubled = true;
    //         break;
    //     }
    // }

    // if (!isDoubled) {
    //     cityInfo.lon = lon;
    //     cityInfo.lat = lat;
    //     cityInfo.cityName = cityName;
        
        // savedCities.push(cityInfo);
        // localStorage.setItem("storageSavedCities", JSON.stringify(savedCities));
    // }

    // showCityList();
    getTodaysWeather(lon, lat, cityName);
    getThreeHourCast(lon, lat);
}

function changeDisplay() {
  introSection.setAttribute("style", "display: none;");
  displaySection.setAttribute("style", "display: block;");
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
        actualTemp.textContent='Temp: ' + data.main.temp;
        let feelsLikeTemp = document.getElementById('feels-like');
        feelsLikeTemp.textContent='Feels like: ' + data.main.feels_like;
        let weatherDescription = document.getElementById('description');
        weatherDescription.textContent='Conditions: ' + data.weather.description;
        let windSpeed = document.getElementById('wind');
        windSpeed.textContent='Wind Speed: ' + data.wind.speed;
        let humidity = document.getElementById('humidity');
        humidity.textContent='Humidity: ' + data.main.humidity + "%";
        console.log(getTodaysWeather);
        
    } )
}

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
                // let j=i/8; 
                // let dateOnly = daysList[i].dt_txt;
                // dateOnly = dateOnly.split(" ");
                // dateOnly = dateOnly[0];
                // let getDay = new Date(dateOnly);
                // let day = getDay.getDay();
                let unixTime = daysList[i].dt;
                let unixToHour = dayjs.unix(unixTime).format('h a, MMM D'); // the exact hour of the forcast
                let hour = document.getElementById('hour0');
                hour.textContent = unixToHour;
                // let dayOfWeek = document.getElementById('day' + j);
                // dayOfWeek.textContent = dayNames[day];
                let actualTemp = document.getElementById('temp0');
                actualTemp.textContent='Temp: ' + daysList[i].main.temp;
                let windSpeed = document.getElementById('wind0');
                windSpeed.textContent='Wind Speed: ' + daysList[i].wind.speed;
                let humidity = document.getElementById('humidity0');
                humidity.textContent='Humidity: ' + daysList[i].main.humidity;
                let weatherDescription = document.getElementById('description0');
                weatherDescription.textContent='Conditions: ' + daysList[i].weather.description;
                let feelsLikeTemp = document.getElementById('feels-like0');
                feelsLikeTemp.textContent='Feels like: ' + daysList[i].main.feels_like;
                
            };
        });
};   console.log(getThreeHourCast);



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
                dailyQuote.textContent = data.content;

                let quoteAuthor = document.getElementById('quoteAuthor');
                quoteAuthor.textContent = author;           
        });
}   