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
        document.querySelector(".temp").innerText = temp + "°C";
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
            document.body.style.backgroundImage = "url('https://64.media.tumblr.com/1dcbe5bf004e9f3552d1619a1fcba998/tumblr_pusx2x7Uxx1tfvddlo1_540.gifv')"
        }    
            else if (description == "mist"){
            document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/77/42/24/77422432ef2ee5f1ffbd8828b1bca3b9.gif')"
        }
            else if (description == "light rain" || 
            description == "moderate rain" ||
            description == "heavy intensity rain") {
            document.body.style.backgroundImage = "url('https://i.pinimg.com/originals/a0/d9/79/a0d9791b631a6f5a480c9bc0f792b29a.gif')"
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

weather.fetchWeather("Denver");