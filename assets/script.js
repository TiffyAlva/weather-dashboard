// API KEY
var apiKey = "843fa40ad68a96668befb0da86d9b44b";
var cityInput = document.querySelector ("#city-input")
var submitBtn = document.querySelector ("#submit");

var cityName = "";

// Current Weather
function getCurrentWeather (lat, lon){
    var url = "https://api.openweathermap.org/data/2.5/onecall?lat=" + lat +"&lon=" + lon +"&units=imperial&appid=" + apiKey;

    fetch(url)
    .then(res => res.json())
    .then(data => { 
        console.log(data)
        displayCurrentWeather(data)
        displayForecast(data, 0)
        displayForecast(data, 1)
        displayForecast(data, 2)
        displayForecast(data, 3)
        displayForecast(data, 4)
    })
}

// Coordinates
function getCoordinates () {
    var url = "https://api.openweathermap.org/geo/1.0/direct?q=" + cityName +"&appid=" + apiKey;

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
//Current weather conditions for that city// 
function displayCurrentWeather (data) {
    var cityNameH2 = document.querySelector("#city-name");
    cityNameH2.textContent = cityName;

    var dayH2 = document.querySelector("#today-date");
    dayH2.textContent = dayjs().format("MMMM DD, YYYY");

    var tempH4 = document.querySelector("#temperature");
    tempH4.textContent = "Temp: " + data.current.temp;

    var humidityH4 = document.querySelector("#humidity");
    humidityH4.textContent = "Humidity: " + data.current.humidity

    var windSpeedH4 = document.querySelector
    ("#wind-speed");
    windSpeedH4.textContent = "Wind: " + data.current.wind_speed

    var uvIndexH4 = document.querySelector("#uv-index");
    uvIndexH4.textContent = "UV Index: " + data.current.uvi

    var icon = document.querySelector("#icon")
    icon.src = "https://openweathermap.org/img/wn/"+ data.current.weather[0].icon +"@2x.png"
}

// 5-day forcast
function displayForecast (data,index) {
   
    var dayH2 = document.querySelector("#date" + (index + 1));
    dayH2.textContent = dayjs().add(index + 1, "day").format("MMMM DD, YYYY");

    var tempH4 = document.querySelector("#temp" + (index + 1));
    tempH4.textContent = "Temp: " + data.daily[index].temp.day;

    var humidityH4 = document.querySelector("#hum" + (index + 1));
    humidityH4.textContent = "Humidity: " + data.daily[index].humidity

    var windSpeedH4 = document.querySelector
    ("#wind" + (index + 1));
    windSpeedH4.textContent = "Wind: " + data.daily[index].wind_speed

    var icon = document.querySelector("#icon" + (index + 1))
    icon.src = "https://openweathermap.org/img/wn/"+ data.daily[index].weather[0].icon +"@2x.png"
}

// Search Cities
function searchCity (event) {
    event.preventDefault();
    cityName = cityInput.value;
    storeData(cityName)
    getCoordinates();
}

//Local storage
function storeData(cityName){
    localStorage.setItem("city", cityName)
}

function loadData(){
    var saveData = localStorage.getItem("city")
    var btn = document.createElement("button")
    btn.textContent = saveData
    document.querySelector("#cityList").append(btn)
}

submitBtn.addEventListener("click", searchCity)


loadData()
