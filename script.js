const timeEle = document.getElementById('time');
const dateEle = document.getElementById('date');
const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
setInterval(() => {
    const time = new Date();
    const month = time.getMonth();
    const date = time.getDate();
    const day = time.getDay();
    const hour = time.getHours();
    const hoursIn12Hr = hour >= 13 ? hour %12: hour
    const minutes = time.getMinutes();
    const ampm = hour >= 12 ? 'PM' : 'AM'

    timeEle.innerHTML = hoursIn12Hr + ':' + minutes +`<span id="am-pm">${ampm}</span>`

    dateEle.innerHTML = days[day] + ' , ' + date + ' ' + months[month]
}, 1000);

let weather = {
    apiKey: "aa396d4f90dd8de76da607b44f704148",
    fetchWeather: function (city) {
        fetch(
            "https://api.openweathermap.org/data/2.5/weather?q=" 
            + city 
            + "&units=metric&appid=" 
            + this.apiKey)
        .then((response) => response.json())
        .then((data) => this.displayWeather(data));
    },
    displayWeather: function(data) {
        const { name } = data;
        const { icon, description } = data.weather[0];
        const { temp, humidity } = data.main;
        const { speed } = data.wind;

        document.querySelector(".city").innerText = name;
        document.querySelector(".icon").src = 
        "https://openweathermap.org/img/wn/" + icon + ".png";
        document.querySelector(".description").innerText = description;
        document.querySelector(".temp").innerText = ((temp*1.8)+ 32).toFixed(2) + "°F";
        document.querySelector(".humidity").innerText = "Humidity: " + humidity + "%";
        document.querySelector(".wind").innerText = "Wind Speed: " + speed + "km/r"
        document.querySelector(".weather").classList.remove("loading");
        if (description == "clear sky") {
            document.body.style.backgroundImage = "url('https://64.media.tumblr.com/c4205bb1f4230f38c8e79b49055a9c67/b4d4f2e5ea6f4d8e-78/s540x810/ad0e1259b9d0d0cf7d120c23e9a217e234b1b62a.gifv')"
        }
            else if (description == "broken clouds" || 
            description == "overcast clouds" || 
            description == "scattered clouds" || 
            description == "few clouds") {
            document.body.style.backgroundImage = "url('https://img.wattpad.com/10cb42553f9af4cbe06150823c625368dbcb7af1/68747470733a2f2f73332e616d617a6f6e6177732e636f6d2f776174747061642d6d656469612d736572766963652f53746f7279496d6167652f3151484b54696a677462595336513d3d2d3737333938393538352e313562633430643837356263343434363338373033343738323631372e676966')"
        }    
            else if (description == "mist"){
            document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/77/42/24/77422432ef2ee5f1ffbd8828b1bca3b9.gif')"
        }
            else if (description == "light rain" || 
            description == "moderate rain" ||
            description == "heavy intensity rain") {
            document.body.style.backgroundImage = "url('https://mendokusai.github.io/public/images/rainy_day.gif')"
        }   else {
            document.body.style.backgroundImage = "url('https://64.media.tumblr.com/c4205bb1f4230f38c8e79b49055a9c67/b4d4f2e5ea6f4d8e-78/s540x810/ad0e1259b9d0d0cf7d120c23e9a217e234b1b62a.gifv')"
        }
    },
    search: function () {
        this.fetchWeather(document.querySelector(".search-bar").value);
    }
};

document
.querySelector(".search button")
.addEventListener("click", function () {
    weather.search();
});

document.querySelector(".search-bar").addEventListener("keyup", function (event) {
    if (event.key == "Enter") {
        weather.search();
    }
});

weather.fetchWeather();