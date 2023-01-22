 let locationbutton = document.querySelector(".location-button")
var locationlist = []
var currentlist = []
var forecastlist = []
var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
async function getData(city = "tripoli") {
  try {
    let mydata = await fetch(`https://api.weatherapi.com/v1/forecast.json?key=db969813171e4d4ab28141813221510&q=${city}&days=7`)
    let myNewData = await mydata.json()
    locationlist = myNewData.location
    currentlist = myNewData.current
    forecastlist = myNewData.forecast.forecastday
    display()
  } catch (error) {
    console.log("catch error in Api respons");
  }

}
function display() {
    var todayWeather = ""
    var todayWeather2 = ""
    var weekWeather = ""
    console.log(locationlist)
    for (let i = 0; i < forecastlist.length; i++) {
        //  const element = array[index];
        var date = new Date(forecastlist[i].date)
        if (i == 0) {
            // console.log();
            todayWeather += `
            <div class="weather-gradient"></div>
            <div class="date-container date-container-left">
              <h2 class="date-dayname">${days[date.getDay()]}</h2>
              <span class="date-day">${date.getDate()} ${monthNames[date.getMonth()]} ${date.getFullYear()}</span>
              <i class="location-icon" data-feather="map-pin"></i>
              <span class="location">${locationlist.name}, ${locationlist.country}</span>
            </div>
            <div class="date-container date-container-right">
            <img src='https:${forecastlist[i].day.condition.icon}' alt="">
          </div>
            <div class="weather-container">
              <i class="weather-icon" data-feather="sun"></i>
              <h1 class="weather-temp">${forecastlist[i].day.maxtemp_c}°C</h1>
              <h2>${forecastlist[i].day.mintemp_c}°C</h2>
              <h3 class="weather-desc">${forecastlist[i].day.condition.text}</h3>
            </div>
            `
            todayWeather2 += `  <div class="precipitation"> 
            <span class="title">PRECIPITATION</span><span class="value">${forecastlist[i].day.totalprecip_mm} %</span>
            <div class="clear"></div></div>
            <div class="humidity"> <span class="title">HUMIDITY</span><span class="value">${forecastlist[i].day.avghumidity} %</span>
            <div class="clear"></div></div>
            <div class="wind"> <span class="title">WIND</span><span class="value">${forecastlist[i].day.maxwind_kph} km/h</span>
            <div class="clear"></div></div>`
        }
        else{
            let isActive =''
            if(i == 1)
            {
                isActive = 'active'
            }
            weekWeather +=`
            <li class="${isActive}">
            <img src="https:${forecastlist[i].day.condition.icon}" alt="">
            <span class="day-name">${days[date.getDay()]}</span>
            <span class="day-temp">${forecastlist[i].day.maxtemp_c}°C</span></li>
            `
        }
       


    }
    document.getElementById("todayWeather").innerHTML = todayWeather
    document.getElementById("todayWeather2").innerHTML = todayWeather2
    document.getElementById("weekWeather").innerHTML = weekWeather
}

locationbutton.addEventListener("keyup", (element) => { getData(element.target.value) });



getData();