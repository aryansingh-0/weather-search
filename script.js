const images = {
    sun: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExaGZycjZpbnd5cmdlenU5anMzMWc5Y2FpOWwyczMwOWhjaGhxcGIzdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3ogwG0cKu7x87xU6VG/giphy.gif',
    cold: 'https://media0.giphy.com/media/v1.Y2lkPTc5MGI3NjExaWZjazdxdXgyeDlwZGIzeG4yYzlxaGs4eGZ3MWo1d2tpaGRydmhraSZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/InjjCnyH0je7e/giphy.gif',
    rain: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdDFuamNicHE2d3p1NHgwOWgwZGx5b2NsajN3M285dzA1MHFpYWtnaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3o6gDYJBQLIHFZoWL6/giphy.gif',
    haze: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExYTVxZTFrd2ExYzJmNGcya2wza2djbW1wamkycHFhbmt4aDQ5dmdkYyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/dgeIH5RPynA6Q/giphy.gif',
    thunder: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExdnV6OXBkdTFrbzl3eW5zaXhiZnBpdGticWVrc3JiMnF0dTNueW1udCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/FZzbTJyRTwPuw/giphy.gif',
    cloud: 'https://media2.giphy.com/media/v1.Y2lkPTc5MGI3NjExeHRkdGp0eGQyOXNrNmZpOGVwaHVzdmNwbGM1am5zcXZ0aGtmaWVxdiZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/zrqT3kn77BlKv4mrHm/giphy.gif',
    sky: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExc3lvMWR0Ym91aXhqbWhzdW1wd20zOXZhaThidnF1czJ4cm5qaGZuaCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/3oz8xwT20ApeHadTlS/giphy.gif',
    unknown: 'https://media1.giphy.com/media/v1.Y2lkPTc5MGI3NjExbHk1cTQ4NTJpZHNkbHZsMXhlYTg5NDRrbjMwOGRncTBwMXNkYWc1aCZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/YyKPbc5OOTSQE/giphy.gif'
};
const apiKey = '2cc5d457b7f69eeb718fd4b4c7b8aadc';
let city;
let temperature;
let humidity;
let weather;
let wind;
let windInfo=document.querySelector('.windInfo');
let weatherInfo=document.querySelector('.weatherInfo');
let humidityInfo=document.querySelector('.humidityInfo');
let image = document.querySelector('.visual');
let reading = document.querySelector('.tempReading');
let cityInput = document.querySelector('.input-box');
let inputBtn = document.querySelector('.input-btn');
let background = document.querySelector('.weatherData');

function findWeather(weather) {
    if (weather === 'clear sky') {
        return `url(${images.sky})`;
    }
    if (weather === 'few clouds' || weather === 'scattered clouds' || weather === 'broken clouds') {
        return `url(${images.cloud})`;
    }
    if (weather === 'shower rain' || weather === 'rain') {
        return `url(${images.rain})`;
    }
    if (weather === 'thunderstorm') {
        return `url(${images.thunder})`;
    }
    if (weather === 'snow') {
        return `url(${images.cold})`;
    }
    if (weather === 'haze') {
        return `url(${images.haze})`;
    }
    return `url(${images.unknown})`;
}




function detectScreenSize() {
    const screenWidth = window.innerWidth;
    if (screenWidth <= 900) { inputBtn.addEventListener('click', function() {
        city = cityInput.value.trim();
    
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
    
        const inform = async () => {
            try {
                let response = await fetch(url);
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                let data = await response.json();
                temperature = (data.main.temp - 273).toFixed(2);
                reading.innerHTML = `${temperature}<sup>°C</sup>`;
                humidity = data.main.humidity;
                weather = data.weather[0].description;
                wind = data.wind.speed;
                let imageUrl = findWeather(weather);
                background.style.backgroundImage = imageUrl;
                humidityInfo.innerHTML= `${humidity} %`;
                weatherInfo.innerHTML=weather;
                windInfo.innerHTML=`${wind} m/s`;
               
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        };
    
        inform();
    });
    
    
    } else {
        inputBtn.addEventListener('click', function() {
            city = cityInput.value;
        
            const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;
        
            const inform = async () => {
                try {
                    let response = await fetch(url);
                    if (!response.ok) {
                        throw new Error('Network response was not ok');
                    }
                    let data = await response.json();
                    temperature = (data.main.temp - 273).toFixed(2);
                    reading.innerHTML = `${temperature}<sup>°C</sup>`;
                    humidity = data.main.humidity;
                    weather = data.weather[0].description;
                    wind = data.wind.speed;
                    let imageUrl = findWeather(weather);
                    image.style.backgroundImage = imageUrl;
                    humidityInfo.innerHTML= `${humidity} %`;
                    weatherInfo.innerHTML=weather;
                    windInfo.innerHTML=`${wind} m/s`;
                } catch (error) {
                    console.error('Error fetching data:', error);
                }
            };
        
            inform();
        });
        
        
    }
   
}

detectScreenSize();
