var apiKey = "843fa40ad68a96668befb0da86d9b44b";
var cityInput = document.querySelector ("#city-input")
var submitBtn = document.querySelector ("#submit");

var cityName = "";

function getCurrentWeather (lat, lon){
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon=" + lon +"&units=imperial&appid=" + apiKey;

    fetch(url)
    .then(res => res.json())
    .then(data => { 
        console.log(data)
        displayCurrentWeather(data)
    })
}

function getCoordinates () {
    var url = "http://api.openweathermap.org/geo/1.0/direct?q=" + cityName +"&appid=" + apiKey;

    fetch(url)
    .then(res => res.json())
    .then(data => {
        console.log(data)

        var lat = data[0].lat;
        var lon = data[0].lon;

        console.log(lat)
        console.log(lon);

        getCurrentWeather(lat, lon)
    })
}
//*Current weather conditions for that city// 
function displayCurrentWeather (data) {
    var cityNameH2 = document.querySelector("#city-name");
    cityNameH2.textContent = cityName;

    var tempH4 = document.querySelector("#temperature");
    tempH4.textContent = "Temp: " + data.current.temp;

    var humidityH4 = document.querySelector("#humidity");
    humidityH4.textContent = "Humidity: " + data.current.humidity

    var windSpeedH4 = document.querySelector
    ("#wind-speed");
    windSpeedH4.textContent = "Wind: " + data.current.wind_speed

    var uvIndexH4 = document.querySelector("#uv-index");
    uvIndexH4.textContent = "UV Index: " + data.current.uvi

}

function searchCity (event) {
    event.preventDefault();
    cityName = cityInput.value;
    getCoordinates();
}

submitBtn.addEventListener("click", searchCity)

// I was able to finish from line 46 to line 50
// Add date next to city and add cloud icons
// I need to display search history list
// 5-day forecast that displays & shows current/future conditions and dates
// FOLLOW Acceptance Criteria
